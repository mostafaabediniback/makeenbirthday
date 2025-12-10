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
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Step1() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [capacityMessage, setCapacityMessage] = useState("");

  const goNext = async () => {
    if (!status) return;

    const url =
      status === "graduate"
        ? "/api/capacity/check/graduate"
        : "/api/capacity/check/student";

    try {
      const res = await fetch(url, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("SERVER_ERROR");
      }

      const data = await res.json();

      console.log("CAPACITY RESPONSE => ", data);

      if (data.status === "full") {
        setCapacityMessage(
          `ظرفیت ${status === "student" ? "دانشجو" : "فارغ‌التحصیل"
          } ها تکمیل شده است.`
        );
        setOpenModal(true);
        return;
      }

      localStorage.setItem("signup-step1", JSON.stringify({ status }));
      navigate("/create/step2");
    } catch (error) {
      console.error("CAPACITY CHECK ERROR:", error);
      setCapacityMessage("خطایی رخ داد. لطفا دوباره تلاش کنید.");
      setOpenModal(true);
    }
  };

  function LabelWithIcons({ label, isStudent }) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flexGrow: 1, fontFamily: "regular", gap: "5px" }}
      >
        {isStudent ? (
          <MenuBookIcon fontSize="medium" color="action" />
        ) : (
          <SchoolIcon fontSize="medium" color="action" />
        )}
        <span style={{ color: "grey" }}>{label}</span>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        mx: "auto"
      }}
    >
      <Navbar step="step1" />

      <Box
        sx={{
          flexGrow: 1,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%"
        }}
      >
        <RadioGroup
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            mr: "5%"
          }}
        >
          <FormControlLabel
            value="graduate"
            label={<LabelWithIcons label="فارغ‌التحصیل" isStudent={false} />}
            labelPlacement="start"
            control={
              <Radio
                sx={{
                  color: "#01144f",
                  "&.Mui-checked": {
                    color: "#01144f"
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
                    color: "#01144f"
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

        <Box
          sx={{
            mt: { xs: "600px", lg: "auto  " },
            pb: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button
            variant="contained"
            disabled={!status}
            onClick={goNext}
            sx={{
              width: "100%",
              height: "55px",
              fontFamily: "medium",
              backgroundColor: status ? "#01144f" : "#c2c2c2",
              fontSize: "20px"
            }}
          >
            ادامه
          </Button>
        </Box>
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
            borderRadius: 2
          }}
        >
          <Typography sx={{ fontFamily: "regular", mb: 2 }}>
            {capacityMessage}
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            sx={{
              width: "100%",
              fontFamily: "medium",
              backgroundColor: "#01144f",
              mt: 2
            }}
          >
            متوجه شدم
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}