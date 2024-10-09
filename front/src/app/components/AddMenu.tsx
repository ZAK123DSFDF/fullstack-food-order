"use client";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogContentText,
} from "@mui/material";
import { useEffect, useState } from "react";
import BreadCrumbs from "./BreadCrumbs";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddPhotoAlternate";
import { useMutation } from "@tanstack/react-query";
import { createMenu } from "../actions/menu/createMenu";
import useLocalStorage from "@/utils/useLocalStorage";
import Image from "next/image";

export default function AddMenu() {
  const initialToppings = [
    { name: "Tomato", selected: true },
    { name: "Mozzarella", selected: true },
    { name: "Basil", selected: true },
    { name: "Pepperoni", selected: true },
    { name: "Bell Peppers", selected: true },
    { name: "Onions", selected: true },
    { name: "Olives", selected: true },
  ];
  const [toppings, setToppings] = useState(initialToppings);
  const [newTopping, setNewTopping] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [openToppingDialog, setOpenToppingDialog] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { hasPermissionToAddMenu } = useLocalStorage();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleTopping = (index: any) => {
    const updatedToppings = toppings.map((topping, i) =>
      i === index ? { ...topping, selected: !topping.selected } : topping
    );
    setToppings(updatedToppings);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  const handleAddTopping = () => {
    setToppings([...toppings, { name: newTopping, selected: false }]);
    setNewTopping("");
    setOpenToppingDialog(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    //@ts-ignore
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      //@ts-ignore
      setUploadedImages([...uploadedImages, ...filesWithPreview]);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createMenu,
    onSuccess: (data) => {
      setMenuName("");
      setPrice("");
      setUploadedImages([]);
      setToppings(initialToppings);
      setOpen(true);
    },
  });

  const handleUpload = (e: any) => {
    e.preventDefault();
    const filteredToppings = toppings
      .filter((topping) => topping.selected !== false)
      .map((top) => top.name);

    const formData = new FormData();
    if (menuName.trim() === "") {
      console.log("name required");
      return;
    }
    if (price.trim() === "") {
      console.log("price required");
      return;
    }
    if (filteredToppings.length === 0) {
      console.log("need to select something");
      return;
    }

    formData.append("name", menuName);
    formData.append("price", price.toString());
    filteredToppings.forEach((topping) => {
      formData.append("toppings", topping);
    });
    uploadedImages.forEach((file) => {
      formData.append("menuPic", file);
    });
    mutate(formData);
  };

  const handleDeleteImage = (index: any) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <BreadCrumbs />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f7f7f7",
            height: "calc(100% - 48px)",
            width: "100%",
            padding: 2,
            overflow: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* Red Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              width: "100%",
              overflow: "auto",
              height: "100%",
              padding: "20px",
              boxSizing: "border-box",
              borderRadius: 2,
            }}
          >
            {hasPermissionToAddMenu && !loading ? (
              <>
                <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                  Add Menu Item
                </Typography>

                {/* Menu Form */}
                <Box
                  component="form"
                  onSubmit={handleUpload}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Menu Name"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, maxWidth: "500px" }}
                  />

                  {/* Toppings Section */}
                  <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                    Toppings
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      mb: 2,
                      maxWidth: 600,
                    }}
                  >
                    {toppings.map((topping, index) => (
                      <FormControlLabel
                        key={topping.name}
                        control={
                          <Checkbox
                            checked={topping.selected}
                            onChange={() => handleToggleTopping(index)}
                            sx={{
                              color: "#e57b0f",
                              "&.Mui-checked": {
                                color: "#e57b0f",
                              },
                              "&.Mui-checked:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          />
                        }
                        label={topping.name}
                        sx={{ mx: 1 }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => setOpenToppingDialog(true)}
                    sx={{
                      mb: 2,
                      maxWidth: "500px",
                      borderColor: "#e57b0f",
                      color: "#e57b0f",
                    }}
                  >
                    Add New Topping
                  </Button>

                  {/* Price Input */}
                  <TextField
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    type="number"
                    sx={{ mb: 2, maxWidth: "500px" }}
                  />

                  {/* Image Upload Section */}
                  <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                    Upload Images
                  </Typography>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      padding: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      mb: 2,
                      backgroundColor: "#f9f9f9",
                      position: "relative",
                      maxWidth: "400px",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  >
                    <input {...getInputProps()} />
                    <AddIcon fontSize="large" color="action" />
                    <Typography variant="body2">
                      Drag and drop images here, or click to upload
                    </Typography>
                  </Box>

                  {/* Display Uploaded Images */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      maxWidth: 600,
                      marginTop: 2,
                    }}
                  >
                    {uploadedImages.map((file: any, index: any) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          width: 100,
                          height: 100,
                          backgroundImage: `url(${file.preview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          onClick={() => handleDeleteImage(index)}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>

                  {/* Add Menu Button */}
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      mt: 2,
                      alignSelf: "center",
                      backgroundColor: "#e57b0f",
                      color: "white",
                    }}
                    disabled={isPending}
                  >
                    {isPending ? "creatingMenu" : "Add menu"}
                  </Button>
                </Box>
                <Dialog
                  open={openToppingDialog}
                  onClose={() => setOpenToppingDialog(false)}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>Add New Topping</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Topping Name"
                      variant="outlined"
                      fullWidth
                      value={newTopping}
                      onChange={(e) => setNewTopping(e.target.value)}
                      sx={{ mt: 2 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenToppingDialog(false)}
                      sx={{ color: "#e57b0f" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddTopping}
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#e57b0f", color: "white" }}
                    >
                      Add Topping
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : loading ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100vh", // Full viewport height
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: 2,
                }}
              >
                <Image
                  loader={({ src }) => {
                    return src;
                  }}
                  width={30}
                  loading="lazy"
                  height={30}
                  alt="loading"
                  src="/spinner.svg"
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100vh", // Full viewport height
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: 2,
                }}
              >
                <Typography>You don't have permission to see this</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Menu Created"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The menu was successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
