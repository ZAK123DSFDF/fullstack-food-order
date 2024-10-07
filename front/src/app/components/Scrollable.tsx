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
        flexShrink: 0,
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
              loader={({ src }) => {
                return src;
              }}
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
            wordWrap: "break-word",
            color: "gray",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f2f9f2",
          borderRadius: "10px",
          overflow: "hidden",
          padding: 2,
          width: "max-content",
          height: "max-content",
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            minWidth: 70,
            minHeight: 70,
            backgroundColor: "#f5e1c2",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Shield size={50} color="#ff8100" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 15, color: "gray" }}>
            Number of Orders
          </Typography>
          <Typography
            sx={{ fontSize: 30, fontWeight: "bold", color: "#ff8100" }}
          >
            20k+
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
