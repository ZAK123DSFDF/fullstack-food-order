"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Signup() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ff9921",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h1" sx={{ color: "white" }}>
          PIZZA
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 5,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: 5,
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                alignSelf: "flex-start",
                textAlign: "left",
                fontSize: { xs: "1rem", md: "1.5rem" },
              }}
            >
              PIZZA
            </Typography>
            <Box
              sx={{
                width: "100%",
                borderBottom: "2px solid #e8e8e8",
                paddingY: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  alignSelf: "flex-start",
                  textAlign: "left",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                }}
              >
                Signup Form
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: { xs: "280px", sm: "400px" },
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              type="text"
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff9921",
                minWidth: { xs: "280px", sm: "400px" },
              }}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <Typography sx={{ alignSelf: "center" }}>
              Have an account?{" "}
              <Link
                style={{ color: "blue", cursor: "pointer" }}
                href={"/login"}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
