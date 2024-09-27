"use client";
import { Box, Typography } from "@mui/material";
import { Shield } from "lucide-react";
import Image from "next/image";

export default function Scrollable() {
  return (
    <Box
      sx={{
        height: "max-content",
        backgroundColor: "white",
        display: "flex",
        width: "max-content",
        padding: 2,
        borderRadius: "10px",
        alignItems: "center",
        gap: 2,
        flexShrink: 0, // Prevent the Scrollable component from shrinking
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              minWidth: 50,
              minHeight: 50,
              position: "relative",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <Image
              src="/man2.jpg"
              fill
              alt="man"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            Azmera Hotel
          </Typography>
        </Box>

        <Typography
          sx={{
            maxWidth: 270,
            wordWrap: "break-word", // Ensure text breaks inside max width
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "red",
          borderRadius: "10px",
          overflow: "hidden",
          padding: 2,
          width: "max-content",
          height: "max-content",
          gap: 2,
          flexShrink: 0, // Prevent the red box from shrinking
        }}
      >
        <Box
          sx={{
            minWidth: 70,
            minHeight: 70,
            backgroundColor: "green",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Shield size={50} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Number of Orders</Typography>
          <Typography>20k+</Typography>
        </Box>
      </Box>
    </Box>
  );
}
