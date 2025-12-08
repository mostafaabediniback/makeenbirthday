"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

export default function Step1() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");


  const goNext = async () => {
    setError(""); 

    const url =
      status === "graduate"
        ? "http://panel.makeenacademy.ir/api/capacity/check/graduate"
        : "http://panel.makeenacademy.ir/api/capacity/check/student";

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "full") {
        setError(data.message); 
        return;
      }

      
      localStorage.setItem("signup-step1", JSON.stringify({ status }));
      navigate("/create/step2");

    } catch (err) {
      setError("خطایی رخ داد. دوباره تلاش کنید.");
    }
  };


  function LabelWithIcons({ label, isStudent }) {
    return (
      <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1, fontFamily: "regular", gap: "5px" }}>
        {isStudent ? <MenuBookIcon fontSize="medium" color="action" /> : <SchoolIcon fontSize="medium" color="action" />}
        <span style={{ color: "grey" }}>{label}</span>
      </Stack>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", maxWidth: "600px", mx: "auto", flexDirection: "column" }}>
      <Navbar step="step1" />

      <Box sx={{ flexGrow: 1, mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <RadioGroup
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", mr: "20px", }}
        >
          <FormControlLabel
            value="graduate"
            label={<LabelWithIcons label="فارغ التحصیل" isStudent={false} />}
            labelPlacement="start"
            control={
              <Radio
                sx={{
                  color: "#01144f",
                  "&.Mui-checked": {
                    color: "#01144f",
                  }
                }}
              />
            }
            sx={{
              border: 1,
              borderColor: status === "graduate" ? "#01144f" : "grey.400",
              borderRadius: 2,
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between"
            }}
          />

          <FormControlLabel
            value="student"
            label={<LabelWithIcons label="دانشجو" isStudent={true} />}
            labelPlacement="start"
            control={
              <Radio
                sx={{
                  color: "#01144f",
                  "&.Mui-checked": {
                    color: "#01144f",
                  }
                }}
              />
            }
            sx={{
              border: 1,
              borderColor: status === "student" ? "#01144f" : "grey.400",
              borderRadius: 2,
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between"
            }}
          />
        </RadioGroup>
        {error && (
          <Box
            sx={{
              color: "red",
              fontFamily: "regular",
              mt: 2,
              textAlign: "center"
            }}
          >
            {error}
          </Box>
        )}


        <Box sx={{ mt: "auto", pb: 3, width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            disabled={!status}
            onClick={goNext}
            sx={{
              width: "100%",
              height: "55px",
              fontFamily: "medium",
              backgroundColor: status ? "#01144f" : "#c2c2c2",
              fontSize: "20px",
            }}
          >
            ادامه
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
