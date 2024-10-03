import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Box, Button, Typography } from "@mui/material";

const SwipeableComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Change to the next slide
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <Swiper
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation
        loop
      >
        <SwiperSlide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
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
                Make your first order and get{" "}
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
            <img
              width={300}
              height={300}
              alt="this is feature"
              src="/pizza.svg"
              className="size1"
            />
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
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
                Try our new pizza flavor!
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  opacity: 0.8,
                  lineHeight: 1.5,
                }}
              >
                Don't miss out on our exclusive offer.
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
            <img
              width={300}
              height={300}
              alt="this is feature"
              src="/pizza.svg"
              className="size1"
            />
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
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
                Enjoy a free drink with your order!
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  opacity: 0.8,
                  lineHeight: 1.5,
                }}
              >
                Pair your pizza with a refreshing beverage.
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
            <img
              width={300}
              height={300}
              alt="this is feature"
              src="/pizza.svg"
              className="size1"
            />
          </Box>
        </SwiperSlide>
      </Swiper>

      {/* Dots for active slide */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: index === activeIndex ? "orange" : "gray",
              margin: "0 5px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Swiper;
