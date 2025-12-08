"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";

import {
  Box,
  Button,
  Typography,
  Modal
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Step4() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  

useEffect(() => {
  const retrieveRaw = localStorage.getItem("retrieve-data");

  if (retrieveRaw) {
    const guest = JSON.parse(retrieveRaw);

    let finalImage = null;

    if (guest.media?.length) {
      let url = guest.media[0].original_url;

      console.log("RAW URL FROM API:", url);

      
      url = url
        .replace("https//", "https://")
        .replace("http//", "http://")
        .replace("http://https://", "https://")
        .replace("https://http://", "http://");

      
      url = url.replace("panel.makeenacademy.irhttps://panel.makeenacademy.ir", "panel.makeenacademy.ir");
      url = url.replace("panel.makeenacademy.irhttp://panel.makeenacademy.ir", "panel.makeenacademy.ir");

      
      url = url.replace("https://", "http://");

      finalImage = url;
      console.log("FINAL CLEAN URL:", finalImage);
    }

    setData({
      name: guest.name,
      phoneNumber: guest.phoneNumber,
      field: guest.field,
      status: guest.status,
      bootcampNumber: guest.bootcampNumber,
      ProgrammingLanguage: guest.ProgrammingLanguage,
      image: finalImage,
      isRetrieve: true
    });

    return;
  }

  
  const step1 = JSON.parse(localStorage.getItem("signup-step1"));
  const step2 = JSON.parse(localStorage.getItem("signup-step2"));
  const step3 = JSON.parse(localStorage.getItem("signup-step3"));

  if (!step1 || !step2 || !step3) {
    navigate("/");
    return;
  }

  setData({
    name: step3.fullName,
    phoneNumber: step3.phone,
    field: step2.major,
    status: step1.status,
    bootcampNumber: step2.bootcamp,
    ProgrammingLanguage: step2.language,
    image: step3.image,
    isRetrieve: false
  });
}, []);





  const handleSubmit = async () => {
    if (!data) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("status", data.status);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("field", data.field);
    formData.append("bootcampNumber", data.bootcampNumber);
    formData.append("ProgrammingLanguage", data.ProgrammingLanguage);

    
    if (!data.isRetrieve && data.image) {
      const blob = await fetch(data.image).then(r => r.blob());
      formData.append("image", blob, "photo.png");
    }

    try {
      const res = await fetch("http://panel.makeenacademy.ir/api/guest/store", {
        method: "POST",
        body: formData
      });

      const result = await res.json();

      if (result.status === true) {
        setModalText("ثبت‌نام با موفقیت انجام شد");
        setOpenModal(true);

        
       
      } else {
        setModalText("خطایی رخ داد");
        setOpenModal(true);
      }
    } catch (error) {
      setModalText("مشکل در ارتباط با سرور");
      setOpenModal(true);
    }
  };

  if (!data) return null;

  return (
    <Box sx={{ minHeight: "100vh", maxWidth: "600px", mx: "auto", display: "flex", flexDirection: "column" }}>
      <Navbar step="step4" />

      <Typography sx={{ mt: 3, textAlign: "center", fontFamily: "regular", fontSize: "20px" }}>
        کارتت آماده شد 🎉
      </Typography>

      {/* CARD */}
      <Box
        ref={cardRef}
        sx={{
          width: 330,
          height: 550,
          mt: 2,
          mx: "auto",
          position: "relative",
          backgroundImage: 'url("/images/card.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "5px",
          overflow: "hidden"
        }}
      >
        {/* PHOTO */}
        <Box
          sx={{
            position: "absolute",
            top: 226.5,
            left: "65.30%",
            transform: "translateX(-50%)",
            width: 80,
            height: 80,
            borderRadius: "50%",
            overflow: "hidden"
          }}
        >
          {data.image ? (
            <img src={data.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#eee" }} />
          )}
        </Box>

        {/* NAME */}
        <Typography
          sx={{
            position: "absolute",
            top: 230,
            right: 170,
            fontFamily: "medium",
            fontSize: "15px",
            color: "white"
          }}
        >
          {data.name}
        </Typography>

        {/* FIELD */}
        <Typography
          sx={{
            position: "absolute",
            top: 260,
            right: 170,
            fontFamily: "regular",
            fontSize: "16px",
            color: "white"
          }}
        >
          {data.field === "programmer" ? "Developer" : data.field === "uiux" ? "UI/UX" : data.field}
         

        </Typography>
      </Box>

      {/* BUTTONS */}
      <Box sx={{ mt: "auto", pb: 3, px: 2, display: "flex", flexDirection: "column", gap: 2 }}>
       

        <Button variant="outlined" onClick={() => navigate("/")} sx={{ fontFamily: "medium" }}>
          خروج
        </Button>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 300, p: 3, background: "white", borderRadius: 2, mx: "auto", mt: "30vh", textAlign: "center" }}>
          <Typography sx={{ fontFamily: "regular", mb: 2 }}>{modalText}</Typography>

          <Button
            variant="contained"
            sx={{ width: "100%", backgroundColor: "#00509B", fontFamily: "regular" }}
            onClick={() => setOpenModal(false)}
          >
            باشه
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
