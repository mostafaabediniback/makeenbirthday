"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Backdrop,
  Fade
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";


export default function Retrieve() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setPhone(value);
  };

  const handleFindCard = async () => {
    if (!phone.startsWith("09") || phone.length !== 11) {
      setModalText("لطفا شماره را درست وارد کنید");
      setOpenModal(true);
      return;
    }

    try {
      const res = await fetch(
        `http://panel.makeenacademy.ir/api/guest/show/${phone}`
      );

      const data = await res.json();

      console.log("DATA FROM API:", data); 

      if (data.status === true) {
        const guest = data.Guest;


        let finalImage = null;

        if (guest.image) {
          
          if (!guest.image.startsWith("http")) {
            finalImage = `http://panel.makeenacademy.ir/storage/guests/${guest.image}`;
          } else {
            finalImage = guest.image;
          }
        }

        
        localStorage.setItem(
          "retrieve-data",
          JSON.stringify({
            ...guest,
            image: finalImage, 
          })
        );

        navigate("/create/step4");
      } else {
        setModalText("شماره‌ای با این مشخصات یافت نشد");
        setOpenModal(true);
      }
    } catch (err) {
      console.log("ERROR:", err);
      setModalText("مشکلی پیش آمده، دوباره تلاش کنید");
      setOpenModal(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        maxWidth: "600px",
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <Navbar step="retrieve" />

      <Box
        sx={{
          flexGrow: 1,
          mt: 4,
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="09123456789"
          value={phone}
          onChange={handlePhoneChange}
          sx={{
            direction: "ltr",
            "& input": {
              fontFamily: "regular",
              textAlign: "right",
            },
          }}
        />

      <Button
            variant="contained"
             sx={{
              mx: "auto", display: "block", width: "100%",
              height: "55px",
              fontFamily: "medium",
              fontSize:"20px"    ,
              backgroundColor: phone.length == 11 ? "#01144f" : "#c2c2c2",
            }}
            onClick={handleFindCard}
          >
            دریافت کارت
          </Button>
      </Box>



<Modal open={openModal} onClose={() => setOpenModal(false)}>
  <Paper
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      p: 3,
      width: "80%",
      maxWidth: "400px",
      textAlign: "center",
      borderRadius: 2,
    }}
  >
    <Typography sx={{ fontFamily: "regular", mb: 2 }}>
      {modalText}
    </Typography>

    <Button
      variant="contained"
      onClick={() => setOpenModal(false)}
      sx={{
        width: "100%",
        fontFamily: "medium",
        backgroundColor: "#01144f",
        "&:hover": { backgroundColor: "#001036" },
      }}
    >
      متوجه شدم
    </Button>
  </Paper>
</Modal>


    </Box>
  );
}
