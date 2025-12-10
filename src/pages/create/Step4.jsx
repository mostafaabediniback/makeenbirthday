
"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { Box, Button, Typography, Modal, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Step4() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [imageReady, setImageReady] = useState(false);

  // -----------------------------
  // 📌 کلید اصلی: اسکرین‌شات کارت
  // -----------------------------
  const waitForAssets = async () => {
    await document.fonts.ready;
    if (imageReady) return;
    await new Promise((resolve) => {
      const start = Date.now();
      const timer = setInterval(() => {
        if (imageReady || Date.now() - start > 3000) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      await waitForAssets();
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
      });

      const img = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = img;
      link.download = "makeen-card.png";
      link.click();
    } catch (error) {
      console.error("Screenshot Error:", error);
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    try {
      await waitForAssets();
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("makeen-card.pdf");
    } catch (error) {
      console.error("PDF Generate Error:", error);
    }
  };

  useEffect(() => {
    const retrieveRaw = localStorage.getItem("retrieve-data");
    if (retrieveRaw) {
      try {
        const parsed = JSON.parse(retrieveRaw);
        if (parsed && typeof parsed === "object") {
          setData({
            name: parsed.name,
            phoneNumber: parsed.phoneNumber,
            field: parsed.field,
            status: parsed.status,
            bootcampNumber: parsed.bootcampNumber,
            ProgrammingLanguage: parsed.ProgrammingLanguage,
            image: parsed.image,
          });
          return;
        }
      } catch (_) {}
    }

    const phone = localStorage.getItem("signup-phone");
    if (!phone) {
      navigate("/");
      return;
    }

    fetch(`https://panel.makeenacademy.ir/api/guest/show/${phone}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.Guest) {
          setModalText("اطلاعاتی از سرور یافت نشد");
          setOpenModal(true);
          return;
        }

        const guest = data.Guest;

        let finalImage = null;
        if (guest.media?.length) {
          finalImage = guest.media[0].original_url;
        } else if (guest.image) {
          finalImage =
            "https://panel.makeenacademy.ir/storage/guests/" + guest.image;
        }

        setData({
          name: guest.name,
          phoneNumber: guest.phoneNumber,
          field: guest.field,
          status: guest.status,
          bootcampNumber: guest.bootcampNumber,
          ProgrammingLanguage: guest.ProgrammingLanguage,
          image: finalImage,
        });
      })
      .catch(() => {
        setModalText("مشکل در ارتباط با سرور");
        setOpenModal(true);
      });
  }, []);

  if (!data) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxWidth: "500px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar step="step4" />

      <Typography
        sx={{
         
          textAlign: "center",
          fontFamily: "regular",
          fontSize: "20px",
        }}
      >
        کارتت آماده شد 🎉
      </Typography>

      {/* CARD */}
      <Box
        ref={cardRef}
        sx={{
          width: { xs: "90%", sm: 330 },
          maxWidth: 330,
          height: { xs: "auto", sm: 550 },
          aspectRatio: { xs: "330/550", sm: "auto" },
          minHeight: 550,
          mt: 2,
          mx: "auto",
          position: "relative",
          backgroundImage: 'url("/images/card.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)"
          }
        }}
      >
        {/* PHOTO */}
        <Box
          sx={{
            position: "absolute",
            top: 226.5,
            right: 74,
            width: 80,
            height: 80,
            borderRadius: "50%",
          }}
        >
          {data.image ? (
            <img
              src={data.image}
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              onLoad={() => setImageReady(true)}
              onError={() => setImageReady(true)}
            />
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
            color: "white",
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
            color: "white",
          }}
        >
          {data.field === "programmer"
            ? "Developer"
            : data.field === "uiux"
            ? "UI/UX"
            : data.field}
        </Typography>
      </Box>

      {/* BUTTONS */}
      <Box
        sx={{
          mt: "auto",
          pb: 3,
          px: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{ 
            fontFamily: "medium", 
            backgroundColor: "#01144f",
            height: "55px",
            fontSize: "18px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#012a7a",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(1, 20, 79, 0.3)"
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
          onClick={handleDownload}
        >
          دانلود کارت
        </Button>

        <Button
          variant="contained"
          sx={{ 
            fontFamily: "medium", 
            backgroundColor: "#01144f",
            height: "55px",
            fontSize: "18px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#012a7a",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(1, 20, 79, 0.3)"
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
          onClick={handleDownloadPDF}
        >
          دانلود PDF
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ 
            fontFamily: "medium",
            height: "55px",
            fontSize: "18px",
            borderColor: "#01144f",
            color: "#01144f",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#012a7a",
              backgroundColor: "rgba(1, 20, 79, 0.05)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
        >
          خروج
        </Button>
      </Box>

      {/* MODAL */}
      <Modal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        sx={{
          backdropFilter: "blur(4px)",
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }
        }}
      >
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
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            animation: "scaleIn 0.2s ease-out"
          }}
        >
          <Typography sx={{ fontFamily: "regular", mb: 2 }}>
            {modalText}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            sx={{ 
              fontFamily: "medium", 
              backgroundColor: "#01144f",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#012a7a",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(1, 20, 79, 0.3)"
              }
            }}
          >
            متوجه شدم
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}
