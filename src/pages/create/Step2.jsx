"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

export default function Step2() {
  const [status, setStatus] = useState("");
  const [major, setMajor] = useState("");
  const [bootcamp, setBootcamp] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const step1 = JSON.parse(localStorage.getItem("signup-step1"));
    if (step1?.status) setStatus(step1.status);
  }, []);

  const handleGoNext = () => {
    localStorage.setItem(
      "signup-step2",
      JSON.stringify({ major, bootcamp, language })
    );
    window.location.href = "/create/step3";
  };

  const studentLangs = [
    { value: "react", label: "React", icon: "/icons/react-original.svg" },
    { value: "asp.net", label: "ASP.NET", icon: "/icons/dot-net-original.svg" },
  ];

  const graduateLangs = [
    { value: "react", label: "React", icon: "/icons/react-original.svg" },
    { value: "asp.net", label: "ASP.NET", icon: "/icons/dot-net-original.svg" },
    { value: "python", label: "Python", icon: "/icons/python-original.svg" },
    { value: "java", label: "Java", icon: "/icons/java-plain.svg" },
    { value: "vuejs", label: "Vue.js", icon: "/icons/vuejs-original.svg" },
    { value: "php", label: "PHP", icon: "/icons/php-plain.svg" },
  ];

  const langs = status === "student" ? studentLangs : graduateLangs;

  const rtlSelectStyle = {
    direction: "rtl",
    textAlign: "right",
    "& .MuiSelect-icon": { right: "auto", left: 8 },
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", maxWidth: "600px", mx: "auto", flexDirection: "column" }}>
      <Navbar step="step2" />

      <Box
        sx={{
          flexGrow: 1,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        {/* رشته */}
        <FormControl fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary",   
            },
            "&.Mui-focused fieldset": {
              borderColor: "#01144f !important",       
              borderWidth: "1px",
            }
          }
        }} >
          <InputLabel
            shrink={false}
            sx={{
              right: "33px",
              top: "1px",
              fontFamily: "regular",
              opacity: major ? 0 : 1,
              pointerEvents: "none",
              color: "grey"
            }}
          >
            رشته تحصیلی
          </InputLabel>

          <Select value={major} onChange={(e) => setMajor(e.target.value)} sx={{ ...rtlSelectStyle, fontFamily: "regular" }}>
            <MenuItem sx={{ fontFamily: "regular" }} value="programmer">برنامه نویس</MenuItem>
            <MenuItem sx={{ fontFamily: "regular" }} value="uiux">طراح UI/UX </MenuItem>
          </Select>
        </FormControl>

        {/* بوتکمپ */}
        <FormControl fullWidth sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary",   
            },
            "&.Mui-focused fieldset": {
              borderColor: "#01144f !important",      
              borderWidth: "1px",
            }
          }
        }}>
          <span
            style={{
              position: "absolute",
              right: "20px",
              top: "15px",
              fontFamily: "regular",
              opacity: bootcamp ? 0 : 1,
              pointerEvents: "none",
              color: "grey"
            }}
          >
            شماره بوتکمپ
          </span>

          <Select value={bootcamp} onChange={(e) => setBootcamp(e.target.value)} sx={{ ...rtlSelectStyle, fontFamily: "regular" }}>
            {(status === "student" ?
              [
                { value: "20", label: "بیستم (20)" },
                { value: "21", label: "بیست و یکم (21)" },
                { value: "22", label: "بیست و دوم (22)" }
              ] :

              [
                { value: "19", label: "نوزدهم (19)" },
                { value: "18", label: "هجدهم (18)" },
                { value: "17", label: "هفدهم (17)" },
                { value: "16", label: "شانزدهم (16)" },
                { value: "15", label: "پانزدهم (15)" },
                { value: "14", label: "چهاردهم (14)" },
                { value: "13", label: "سیزدهم (13)" },
                { value: "12", label: "دوازدهم (12)" },
                { value: "11", label: "یازدهم (11)" },
                { value: "10", label: "دهم(10)" },
                { value: "9", label: "نهم (9)" },
                { value: "8", label: "هشتم (8)" },
                { value: "7", label: "هفتم(7)" },
                { value: "6", label: "ششم (6)" },
                { value: "5", label: "پنجم (5)" },
                { value: "4", label: "چهارم (4)" },


              ]



            ).map((b) => (
              <MenuItem sx={{ fontFamily: "regular" }} key={b.value} value={b.value}>{b.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* زبان */}
        {major === "programmer" && (
          <FormControl fullWidth sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary",  
              },
              "&.Mui-focused fieldset": {
                borderColor: "#01144f !important",       
                borderWidth: "1px",
              }
            }
          }}>
            <InputLabel shrink={false} sx={{
              opacity: language ? 0 : 1, pointerEvents: "none", position: "absolute",
              right: "30px",

              fontFamily: "regular",

              pointerEvents: "none",
              color: "grey"
            }}>
              زبان برنامه‌نویسی
            </InputLabel>

            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ ...rtlSelectStyle, fontFamily: "regular" }}
              renderValue={(value) => {
                const item = langs.find((l) => l.value === value);
                return item ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={item.icon} width={22} />
                    {item.label}
                  </Box>
                ) : "انتخاب کنید";
              }}
            >
              {langs.map((l) => (
                <MenuItem sx={{
                  fontFamily: "regular"
                }} key={l.value} value={l.value}>
                  <img src={l.icon} width={22} />
                  <ListItemText>{l.label}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ mt: "auto", pb: 3 }}>
          <Button
            variant="contained"
            disabled={!major || !bootcamp || (major === "programmer" && !language)}
            onClick={handleGoNext}
            sx={{
              mx: "auto", display: "block", width: "100%",
               fontSize:"20px"    ,
              height: "55px",
              fontFamily: "medium",
              backgroundColor: major && bootcamp ? "#01144f" : "#c2c2c2",
            }}
          >
            ادامه
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
