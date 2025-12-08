"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Step3() {
 
const [image, setImage] = useState(null);      
const [imageFile, setImageFile] = useState(null); 

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

 const handleImageUpload = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
    setImage(URL.createObjectURL(file)); 
  }
};

  const handleDelete = () => {
    setImage(null);
    setOpenDeleteModal(false);
  };

  
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setPhone(value);
  };

const handleNext = () => {
  if (phone.length !== 11 || !phone.startsWith("09")) {
    setOpenPhoneModal(true);
    return;
  }

  const saveAndGo = (imgBase64 = null) => {
   localStorage.setItem(
  "signup-step3",
  JSON.stringify({ fullName, phone, image: imgBase64 })
);
    window.location.href = "/create/step4";
  };

  
  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => saveAndGo(reader.result);
    reader.readAsDataURL(imageFile);
  } else {
    
    saveAndGo(null);
  }
};


  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "500px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <Navbar step="step3" />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2
        }}
      >
        {/* دایره آپلود عکس */}
    <Box
  sx={{
    width: 230,
    height: 230,
    flexShrink: 0,       
    borderRadius: "50%",
    border: "2px dashed #999",
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    overflow: "hidden",
    cursor: "pointer",
    position: "relative"
  }}
  onClick={() => document.getElementById("upload-input").click()}
>

          {image ? (
            <img
              src={image}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <Typography sx={{ color: "#777", fontFamily: "regular" }}>
                افزودن عکس
              </Typography>
              <Typography sx={{ color: "#777", fontFamily: "regular" }}>
                حداکثر حجم یک مگابایت
              </Typography>
            </>
          )}

          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </Box>

        
        <Box sx={{ mx: "auto" }}>
          <Button
            startIcon={<DeleteIcon />}
            disabled={!image}
            onClick={() => setOpenDeleteModal(true)}
            sx={{
              fontFamily: "regular",
              color: image ? "#CF7721" : "rgba(0,0,0,0.38)",
              borderRadius: 0,
              textTransform: "none",
              "& .MuiButton-startIcon": {
                color: image ? "#CF7721" : "rgba(0,0,0,0.38)",
              },
            }}
          >
            حذف عکس
          </Button>
        </Box>

        {/* فرم نام و شماره */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ fontFamily: "regular", pr: 1 }}>
            نام و نام خانوادگی
          </Typography>
          <TextField
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثال: علی رضایی"
            sx={{ "& .MuiInputBase-root": { fontFamily: "regular" } }}
          />

          <Typography sx={{ fontFamily: "regular", pr: 1 }}>
            شماره تماس
          </Typography>
          <TextField
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
            placeholder="09123456789"
            sx={{ "& .MuiInputBase-root": { fontFamily: "regular" } }}
          />
        </Box>

        {/* دکمه ادامه */}
        <Box
          sx={{
            mt:"12%",
            pb: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button
            variant="contained"
             sx={{
              mx: "auto", display: "block", width: "100%",
              height: "55px",
              fontFamily: "medium",
              fontSize:"20px"    ,
              backgroundColor: image && fullName && phone ? "#01144f" : "#c2c2c2",
            }}
            onClick={handleNext}
          >
            ادامه
          </Button>
        </Box>
      </Box>

      {/* مودال حذف عکس */}
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            width: 300,
            p: 3,
            backgroundColor: "white",
            borderRadius: 2,
            mx: "auto",
            mt: "30vh",
            textAlign: "center"
          }}
        >
          <DeleteIcon sx={{ fontSize: 40, color: "#CF7721", mb: 1 }} />
          <Typography sx={{ fontFamily: "regular", mb: 2 }}>
            آیا از حذف عکس مطمئن هستید؟
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ fontFamily: "regular" }}
              onClick={() => setOpenDeleteModal(false)}
            >
              انصراف
            </Button>

            <Button
              variant="contained"
              sx={{
                fontFamily: "regular",
                backgroundColor: "#CF7721",
                "&:hover": { backgroundColor: "#b8651c" }
              }}
              onClick={handleDelete}
            >
              حذف
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* مودال خطای شماره تلفن */}
      <Modal open={openPhoneModal} onClose={() => setOpenPhoneModal(false)}>
        <Box
          sx={{
            width: 300,
            p: 3,
            backgroundColor: "white",
            borderRadius: 2,
            mx: "auto",
            mt: "30vh",
            textAlign: "center"
          }}
        >
          <Typography
            sx={{ fontFamily: "regular", mb: 2, color: "red", fontSize: "15px" }}
          >
            لطفا شماره را درست وارد کنید
          </Typography>

          <Button
            variant="contained"
            sx={{
              width: "80%",
              fontFamily: "regular",
              backgroundColor: "#CF7721",
              "&:hover": { backgroundColor: "#b8651c" }
            }}
            onClick={() => setOpenPhoneModal(false)}
          >
            متوجه شدم
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
