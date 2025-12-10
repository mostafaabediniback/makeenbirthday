"use client";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EastIcon from '@mui/icons-material/East';

export default function Navbar({ step }) {
  const navigate = useNavigate();

  const titles = {
    step1: "انتخاب وضعیت",
    step2: "تکمیل مشخصات", 
    step3: "آپلود عکس",
    step4: "دریافت کارت",
    retrieve:"دریافت مجدد کارت"
  };

  return (
    <AppBar sx={{fontFamily:"medium" }}
     position="static" color="default">
      <Toolbar sx={{ position: "relative" }}>
        {/* عنوان وسط */}
        <Typography
          variant="h6"
          component="div"
          sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)",fontFamily:"bold" }}
        >
          {titles[step ?? ""] || ""}
        </Typography>

        {/* آیکون ته سمت راست */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => navigate(-1)}
          aria-label="بازگشت"
          size="large"
          sx={{ 
            position: "absolute", 
            right: 8,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              transform: "translateX(-4px)"
            },
            "&:active": {
              transform: "translateX(-2px)"
            }
          }}
        >
          <EastIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
