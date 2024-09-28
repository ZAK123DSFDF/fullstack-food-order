"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Card from "./Card";

export default function MenuDetail() {
  const images = [
    "/city1.jpg",
    "/man1.jpg",
    "/man2.jpg",
    "/man3.jpg",
    "/man4.jpg",
  ];
  const largeImageArray = Array.from(
    { length: 30 },
    (_, i) => images[i % images.length]
  );
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [checked, setChecked] = useState([true, true, true, true, false]);

  // Modal state
  const [open, setOpen] = useState(false);

  // Handle checkbox change
  const handleChange = (index: any) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
  };

  // Handle modal open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100vw",
        height: "100vh",
        backgroundColor: "blue",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-start" },
          justifyContent: "flex-start",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 5,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Large Image Box */}
        <Box
          sx={{
            width: { xs: "100%", md: "500px" },
            height: { xs: "300px", md: "500px" },
            overflow: "hidden",
            borderRadius: "10px",
            border: "2px solid #ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={selectedImage}
            alt="Selected"
            width={500}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>

        {/* Thumbnails Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            overflowY: { xs: "auto", md: "auto" },
            height: { xs: "auto", md: "500px" },
            maxWidth: { xs: "100%", md: "200px" },
          }}
        >
          {largeImageArray.map((img, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "80px",
                minHeight: "80px",
                cursor: "pointer",
                border:
                  selectedImage === img ? "2px solid blue" : "2px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
                transition: "border 0.3s ease",
              }}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Margherita</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
            }}
          >
            {checked.map((isChecked, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleChange(index)}
                    sx={{
                      color: isChecked ? "blue" : "default",
                    }}
                  />
                }
                label={`Checkbox ${index + 1}`}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                minWidth: 30,
                minHeight: 30,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Minus />
            </Box>
            <Typography>1</Typography>
            <Box
              sx={{
                minWidth: 30,
                minHeight: 30,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Plus />
            </Box>
            <Typography>
              150
              <Typography
                component="span"
                sx={{
                  fontSize: "0.75em",
                  marginLeft: "4px",
                }}
              >
                birr
              </Typography>
            </Typography>
          </Box>
          <Button sx={{ alignSelf: "flex-start" }} onClick={handleClickOpen}>
            Order
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "red",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography>Related</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
          }}
        >
          <Card />
        </Box>
      </Box>

      {/* Success Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You've ordered the product successfully!</DialogTitle>
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
