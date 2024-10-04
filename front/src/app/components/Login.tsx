"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getLogin } from "../actions/user/getLogin";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useMutation({
    mutationFn: getLogin,
    onSuccess: (data) => {
      console.log(data);
      const { password, ...userData } = data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      if (data.user.role === "CUSTOMER") {
        window.location.href = "/";
      } else if (data.user.role === "SERVANT" || data.user.role === "ADMIN") {
        window.location.href = "/dashboard/orders";
      }
    },
  });
  const loginHandle = (e: any) => {
    e.preventDefault();
    console.log(email, password);
    mutate({ email, password });
    setEmail("");
    setPassword("");
  };
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
            alignItems: "center",
            justifyContent: "center",
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
                Login
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#ff9921",
                minWidth: { xs: "280px", sm: "400px" },
              }}
              fullWidth
              onClick={loginHandle}
            >
              {isPending ? "submitting" : "submit"}
            </Button>
            {isError && (
              <Typography sx={{ color: "red" }}>
                credentials not correct
              </Typography>
            )}
            <Typography sx={{ alignSelf: "center" }}>
              dont Have an account?{" "}
              <Link
                style={{ color: "blue", cursor: "pointer" }}
                href={"/signup"}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
