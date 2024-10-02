"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Send,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import Scrollable from "./Scrollable";
import Card from "./Card";
import { usePathname, useRouter } from "next/navigation";

export default function Home({ data }: any) {
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
  const router = useRouter();
  const handleNavigation = () => {
    if (data.isAuthenticated) {
      router.push("/orderHistory");
    } else {
      router.push("/login");
    }
  };
  const handleSignup = () => {
    router.push("/signup");
  };
  const items = Array.from({ length: 10 }, (_, index) => (
    <Scrollable key={index} />
  ));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: -9999,

          background:
            "linear-gradient(to bottom, transparent 10%, rgba(229, 123, 15, 0.6) 50%, transparent 90%)",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: 5,
            paddingY: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Image src="/pizzalogo.svg" width={30} height={30} alt="pizza" />
            <Typography
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 30,
                color: "#af5901",
              }}
            >
              Pizza
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 10 }}>
            <Typography
              sx={{
                cursor: "pointer",
                fontSize: 25,
                fontWeight: "bold",
                color: "#ff8609",
              }}
            >
              Home
            </Typography>
            <Typography
              sx={{ cursor: "pointer", fontSize: 25, fontWeight: "regular" }}
              onClick={handleNavigation}
            >
              Orders
            </Typography>
            <Typography
              sx={{ cursor: "pointer", fontSize: 25, fontWeight: "regular" }}
            >
              Who we are
            </Typography>
          </Box>
          <Button
            onClick={handleSignup}
            sx={{
              cursor: "pointer",
              backgroundColor: "#ff890f",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px 20px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#e57b0f",
              },
            }}
          >
            Register
          </Button>
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
                  background: "linear-gradient(to right, #e57b0f, #ffb74d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Order Us
              </Typography>
              <Typography
                sx={{
                  fontSize: subTextSize,
                  maxWidth: { xs: "250px", sm: "400px", md: "800px" },
                  marginTop: 2,
                  color: "#1e1b18",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum rutrum, risus vel tempus lobortis, augue quam
                condimentum eros, ac congue.
              </Typography>
            </Box>
          </Box>
          <Image
            src="/pizza.svg"
            alt="pizza"
            width={900}
            height={900}
            className="size"
            style={{
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",

          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}
        >
          Featured Pizza
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: 400,
            backgroundColor: "#50482b",
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
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(229, 123, 15, 0.3) 60%, #fff8f1 80%, transparent 100%)",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
          }}
        >
          Top Restaurant
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflow: "auto",
            gap: 5,
            "&::-webkit-scrollbar": {
              height: "8px",
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(0, 0, 0, 0.7)",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
          {items}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff8f1",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
          }}
        >
          Popular Pizza
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
            justifyContent: { xs: "center", lg: "flex-start" },
          }}
        >
          <Card data={data} mode="allData" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff8f1",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: "regular",
            color: "#7f7c78",
          }}
        >
          Fasting
        </Typography>
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
          <Card data={data} mode="allData" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ccb691",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 10,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { lg: 4 },
            flexDirection: { xs: "column", md: "row" },
            whiteSpace: "nowrap",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Home
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Order
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            About Us
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Image src="/pizzalogo.svg" width={40} height={40} alt="pizza" />
          <Box
            sx={{
              width: 300,
              height: 40,
              backgroundColor: "white",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingX: 2,
            }}
          >
            <Send color="orange" />
          </Box>
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
