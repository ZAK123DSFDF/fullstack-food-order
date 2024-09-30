"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createUser } from "../actions/user/createUser";
import { useMutation } from "@tanstack/react-query";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      phoneNumber: "",
    },
    mode: "onBlur",
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const onSubmit = async (data: any) => {
    try {
      await mutate(data);
      reset();
    } catch (err) {
      console.error("Signup failed:", err);
    }
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
          onSubmit={handleSubmit(onSubmit)}
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
              label="name"
              variant="outlined"
              type="text"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              type="text"
              fullWidth
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
            />
            <TextField
              label="location"
              variant="outlined"
              type="text"
              fullWidth
              {...register("location", { required: "Location is required" })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message}
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
              {isPending ? "submitting" : "submit"}
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
