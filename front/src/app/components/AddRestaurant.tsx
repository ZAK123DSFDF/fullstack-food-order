"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { createRestaurant } from "../actions/restaurant/createRestaurant";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      phoneNumber: "",
      restaurantLocation: "",
      restaurantName: "",
      image: null, // for storing the uploaded file
    },
    mode: "onBlur",
  });

  const password = watch("password");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createRestaurant,
    onSuccess: (data) => {
      console.log(data);
      resetForm();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("location", data.location);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("restaurantName", data.restaurantName);
    formData.append("restaurantLocation", data.restaurantLocation);
    formData.append("restaurantPic", data?.image);

    mutate(formData);
  };

  const [file, setFile] = useState(null);
  const [isClient, setIsClient] = useState(false); // To check if client-side rendering has occurred

  // Set `isClient` to true only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setFile(
        Object.assign(newFile, { preview: URL.createObjectURL(newFile) })
      );
      setValue("image", newFile, { shouldValidate: true });
    }
  };

  const handleDelete = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview); // Clean up object URL
    }
    setFile(null);
    setValue("image", null, { shouldValidate: true });
  };
  const resetForm = () => {
    // Clean up object URL when resetting form
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    reset();
    setValue("image", null);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

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
                Register Restaurant
              </Typography>
            </Box>
          </Box>

          {/* Form Fields */}
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
              label="Name"
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
              label="Location"
              variant="outlined"
              type="text"
              fullWidth
              {...register("location", { required: "Location is required" })}
              error={Boolean(errors.location)}
              helperText={errors.location?.message}
            />
            <TextField
              label="restaurantName"
              variant="outlined"
              type="text"
              fullWidth
              {...register("restaurantName", {
                required: "Restaurant Name is required",
              })}
              error={Boolean(errors.restaurantName)}
              helperText={errors.restaurantName?.message}
            />
            <TextField
              label="restaurantLocation"
              variant="outlined"
              type="text"
              fullWidth
              {...register("restaurantLocation", {
                required: "Restaurant Location is required",
              })}
              error={Boolean(errors.restaurantLocation)}
              helperText={errors.restaurantLocation?.message}
            />

            {/* Image Upload Section */}
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #e8e8e8",
                borderRadius: "4px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                marginBottom: "16px",
                backgroundColor: isDragActive ? "#ffcc80" : "transparent",
                transition: "background-color 0.3s ease",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1">
                Drag & drop an image here, or click to select an image
              </Typography>
            </Box>

            {/* Preview Image (Client-side only) */}
            {isClient && file && (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box key={file?.name} sx={{ position: "relative" }}>
                  <img
                    src={file?.preview}
                    alt={file?.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#ff9921",
              width: "100%",
              height: "50px",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#ffcc80",
              },
            }}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </Button>

          {isError && <Typography color="error">{error.message}</Typography>}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "1rem",
          }}
        >
          <Link href="/login" passHref>
            <Typography variant="body2">
              Already have an account? Login
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
