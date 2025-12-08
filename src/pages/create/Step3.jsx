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
    setImageFile(null);
    setOpenDeleteModal(false);
  };

  const handlePhoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    setPhone(v);
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
      const r = new FileReader();
      r.onloadend = () => saveAndGo(r.result);
      r.readAsDataURL(imageFile);
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

      {/* کل کانتنت بدون اسکرول */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
          mt: 3
        }}
      >
        {/* --- آپلود عکس (ثابت و بدون اسکرول) --- */}
        <Box
          sx={{
            width: 220,
            height: 220,
            flexShrink: 0,
            borderRadius: "50%",
            border: "2px dashed #999",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            <Typography sx={{ fontFamily: "regular", color: "#777" }}>
              + افزودن عکس
            </Typography>
          )}

          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </Box>

        {/* دکمه حذف عکس */}
        <Button
          startIcon={<DeleteIcon />}
          disabled={!image}
          onClick={() => setOpenDeleteModal(true)}
          sx={{
            mx: "auto",
            fontFamily: "regular",
            color: image ? "#CF7721" : "rgba(0,0,0,0.38)"
          }}
        >
          حذف عکس
        </Button>

        {/* فرم‌ها */}
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

        {/* دکمه ادامه — همیشه پایین */}
        <Box sx={{ mt: "auto", pb: 3 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              width: "100%",
              height: "55px",
              fontSize: "20px",
              fontFamily: "medium",
              backgroundColor:
                image && fullName && phone ? "#01144f" : "#c2c2c2"
            }}
          >
            ادامه
          </Button>
        </Box>
      </Box>

      {/* مودال حذف */}
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
                backgroundColor: "#CF7721",
                fontFamily: "regular"
              }}
              onClick={handleDelete}
            >
              حذف
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* مودال خطای شماره */}
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
          <Typography sx={{ color: "red", mb: 2, fontFamily: "regular" }}>
            لطفا شماره را درست وارد کنید
          </Typography>

          <Button
            variant="contained"
            sx={{
              width: "80%",
              backgroundColor: "#CF7721",
              fontFamily: "regular"
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
