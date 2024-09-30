"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { Facebook, Linkedin, Shield, Twitter, Youtube } from "lucide-react";
import Scrollable from "./Scrollable";
import Card from "./Card";

export default function Home({ data }: any) {
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  const [fontSize, setFontSize] = useState("8rem");
  const [subTextSize, setSubTextSize] = useState("1.5rem");
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 450) {
      setFontSize("2.5rem");
      setSubTextSize("0.6rem");
    } else if (screenWidth < 700) {
      setFontSize("4.5rem");
      setSubTextSize("1rem");
    } else if (screenWidth < 850) {
      setFontSize("6rem");
      setSubTextSize("1.2rem");
    } else if (screenWidth < 960) {
      setFontSize("7rem");
      setSubTextSize("1.25rem");
    } else if (screenWidth < 1200) {
      setFontSize("8rem");
      setSubTextSize("1.5rem");
    } else {
      setFontSize("12rem");
      setSubTextSize("2rem");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: -2,
          gap: 1,
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", paddingX: 5 }}
        >
          <Typography>Pizza</Typography>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography>Home</Typography>
            <Typography>Order Us</Typography>
            <Typography>Who we are</Typography>
          </Box>
          <Button>Register</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: { xs: 2, sm: 4, md: 6, lg: 10 },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "max-content",
                height: "max-content",
                marginTop: { xs: 3, sm: 5, md: 10 },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: fontSize,
                  fontWeight: 800,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Order Us
              </Typography>
              <Typography
                sx={{
                  fontSize: subTextSize,
                  maxWidth: { xs: "250px", sm: "400px" },
                  marginTop: 2,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </Box>
          </Box>
          <Image
            src="/pizza.svg"
            alt="pizza"
            width={900}
            height={900}
            className="size"
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          backgroundColor: "blue",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          overflow: "hidden",
        }}
      >
        <Typography>Featured List</Typography>
        <Box
          sx={{
            width: "100%",
            height: 300,
            backgroundColor: "red",
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
              backgroundColor: "violet",
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
              }}
            >
              make you first order and get 50% off
            </Typography>
            <Typography>
              jfkajf afjldjfieja fjaiejfa fjkaje jfaijlf fiajdk aifjekaeja
              faiejfkajdfiejafe
            </Typography>
            <Button>order now</Button>
          </Box>
          <Image
            width={300}
            height={300}
            alt="this is feature"
            src="/pizza.svg"
            className="size1"
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          backgroundColor: "green",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography>Top Restaurant</Typography>
        <Box sx={{ display: "flex", overflow: "auto", gap: 5 }}>
          <Scrollable />
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
        <Typography>Popular Pizza</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
            justifyContent: { xs: "center", lg: "flex-start" },
          }}
        >
          <Card data={data} />
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
        <Typography>Fasting</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Card />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "orange",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 10,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { lg: 2 },
            flexDirection: { xs: "column", lg: "row" },
            whiteSpace: "nowrap",
          }}
        >
          <Typography>Home</Typography>
          <Typography>Order</Typography>
          <Typography>About Us</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>PIZZA</Typography>
          <Box sx={{ width: 300, height: 40, backgroundColor: "violet" }}></Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 5,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { lg: 2 },
            flexDirection: { xs: "column", lg: "row" },
            whiteSpace: "nowrap",
          }}
        >
          <Typography sx={{ color: "white" }}>
            @2024 Pizza All Rights Reserved
          </Typography>
          <Typography sx={{ color: "white" }}>Terms of conditions</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Facebook color="white" />
          <Linkedin color="white" />
          <Twitter color="white" />
          <Youtube color="white" />
        </Box>
      </Box>
    </>
  );
}
