"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function ScrollableData({ color }: any) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 400,
          backgroundColor: color,
          borderRadius: "30px",
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          paddingX: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingY: 5,
            gap: 3,
            minWidth: { xs: 200, sm: 400, md: 450, lg: 600, xl: 500 },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
                xl: "4rem",
              },
              maxWidth: "800px",
              lineHeight: {
                xs: "1.2",
                sm: "1.2",
                md: "1.1",
                lg: "1.1",
                xl: "1",
              },
              color: "white",
              fontWeight: "bold",
            }}
          >
            make you first order and get{" "}
            <span style={{ color: "#e57b0f", fontWeight: "bold" }}>
              50% off
            </span>
          </Typography>
          <Typography
            sx={{
              color: "white",
              opacity: 0.8,
              lineHeight: 1.5,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            accumsan, dolor ac lacinia viverra, lacus justo laoreet libero
          </Typography>
          <Button
            sx={{
              fontWeight: "bold",
              backgroundColor: "#e57b0f",
              color: "white",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#d95c0f",
              },
            }}
          >
            Order Now
          </Button>
        </Box>
        <Image
          loader={({ src }) => {
            return src;
          }}
          width={300}
          height={300}
          alt="this is feature"
          src="/pizza.svg"
          className="size1"
        />
      </Box>
    </>
  );
}
