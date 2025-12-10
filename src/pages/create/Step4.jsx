// "use client";

// import { useEffect, useState, useRef } from "react";
// import Navbar from "../../components/Navbar";
// import { Box, Button, Typography, Modal, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function Step4() {
//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const [data, setData] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalText, setModalText] = useState("");
  
//  useEffect(() => {
//   const phone = localStorage.getItem("signup-phone");

//   if (!phone) {
//     navigate("/");
//     return;
//   }

//   fetch(`https://panel.makeenacademy.ir/api/guest/show/${phone}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data || !data.Guest) {
//         setModalText("اطلاعاتی از سرور یافت نشد");
//         setOpenModal(true);
//         return;
//       }

//       const guest = data.Guest;

//       // تعیین عکس
//       let finalImage = null;
//       if (guest.media?.length) {
//         finalImage = guest.media[0].original_url;
//       } else if (guest.image) {
//         finalImage = `https://panel.makeenacademy.ir/storage/guests/${guest.image}`;
//       }

//       setData({
//         name: guest.name,
//         phoneNumber: guest.phoneNumber,
//         field: guest.field,
//         status: guest.status,
//         bootcampNumber: guest.bootcampNumber,
//         ProgrammingLanguage: guest.ProgrammingLanguage,
//         image: finalImage,
//       });
//     })
//     .catch(() => {
//       setModalText("مشکل در ارتباط با سرور");
//       setOpenModal(true);
//     });
// }, []);


//   if (!data) return null;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         maxWidth: "500px",
//         mx: "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Navbar step="step4" />

//       <Typography
//         sx={{
//           mt: 3,
//           textAlign: "center",
//           fontFamily: "regular",
//           fontSize: "20px",
//         }}
//       >
//         کارتت آماده شد 🎉
//       </Typography>

//       {/* CARD */}
//       <Box
//         ref={cardRef}
//         sx={{
//           width: 330,
//           height: 550,
//           mt: 2,
//           mx: "auto",
//           position: "relative",
//           backgroundImage: 'url("/images/card.jpg")',
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           borderRadius: "5px",
//           overflow: "hidden",
//         }}
//       >
//         {/* PHOTO */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 226.5,
//             left: "65.30%",
//             transform: "translateX(-50%)",
//             width: 80,
//             height: 80,
//             borderRadius: "50%",
//             overflow: "hidden",
//           }}
//         >
//           {data.image ? (
//             <img
//               src={data.image}
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           ) : (
//             <div style={{ width: "100%", height: "100%", background: "#eee" }} />
//           )}
//         </Box>

//         {/* NAME */}
//         <Typography
//           sx={{
//             position: "absolute",
//             top: 230,
//             right: 170,
//             fontFamily: "medium",
//             fontSize: "15px",
//             color: "white",
//           }}
//         >
//           {data.name}
//         </Typography>

//         {/* FIELD */}
//         <Typography
//           sx={{
//             position: "absolute",
//             top: 260,
//             right: 170,
//             fontFamily: "regular",
//             fontSize: "16px",
//             color: "white",
//           }}
//         >
//           {data.field === "programmer"
//             ? "Developer"
//             : data.field === "uiux"
//             ? "UI/UX"
//             : data.field}
//         </Typography>
//       </Box>

//       {/* BOTTOM BUTTONS */}
//       <Box
//         sx={{
//           mt: "auto",
//           pb: 3,
//           px: 2,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={() => navigate("/")}
//           sx={{ fontFamily: "medium" }}
//         >
//           خروج
//         </Button>
//       </Box>

//       {/* MODAL */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Paper
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             p: 3,
//             width: "80%",
//             maxWidth: "400px",
//             textAlign: "center",
//             borderRadius: 2,
//           }}
//         >
//           <Typography sx={{ fontFamily: "regular", mb: 2 }}>
//             {modalText}
//           </Typography> 
//           <Button
//             variant="contained"
//             onClick={() => setOpenModal(false)}
//             sx={{ fontFamily: "medium", backgroundColor: "#01144f" }}
//           >
//             متوجه شدم
//           </Button>
//         </Paper>
//       </Modal>
//     </Box>
//   );
// }




"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { Box, Button, Typography, Modal, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

export default function Step4() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  // -----------------------------
  // 📌 کلید اصلی: اسکرین‌شات کارت
  // -----------------------------
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        scale: 2,
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

  // -----------------------------
  // 📌 گرفتن اطلاعات سرور
  // -----------------------------
  useEffect(() => {
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
          width: 330,
          height: 550,
          mt: 2,
          mx: "auto",
          position: "relative",
          backgroundImage: 'url("/images/card.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "5px",
          overflow: "hidden",
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
            overflow: "hidden",
          }}
        >
          {data.image ? (
            <img
              src={data.image}
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{ fontFamily: "medium", backgroundColor: "#01144f" }}
          onClick={handleDownload}
        >
          دانلود کارت
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ fontFamily: "medium" }}
        >
          خروج
        </Button>
      </Box>

      {/* MODAL */}
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
            sx={{ fontFamily: "medium", backgroundColor: "#01144f" }}
          >
            متوجه شدم
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}
