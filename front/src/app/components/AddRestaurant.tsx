"use client";
import { Box, Button, TextField, Typography } from "@mui/material";

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

      {/* Form Box */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 5,
          boxSizing: "border-box",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
            width: "100%",
          }}
        >
          {/* Text above the form with responsive font size */}
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                alignSelf: "flex-start",
                textAlign: "left",
                fontSize: { xs: "1rem", md: "1.5rem" }, // Smaller font size on small devices
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
                  fontSize: { xs: "1rem", md: "1.5rem" }, // Smaller font size on small devices
                }}
              >
                Add Restaurant Form
              </Typography>
            </Box>
          </Box>

          {/* Form Fields with minWidth to prevent shrinking */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: { xs: "280px", sm: "400px" }, // Minimum width for form on smaller devices
            }}
          >
            <TextField
              label="Admin name"
              variant="outlined"
              type="text"
              fullWidth
            />
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
            <TextField
              label="Restaurant Name"
              variant="outlined"
              type="text"
              fullWidth
            />
            <TextField
              label="Restaurant Location"
              variant="outlined"
              type="text"
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff9921",
                minWidth: { xs: "280px", sm: "400px" }, // Prevent button shrinking
              }}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
