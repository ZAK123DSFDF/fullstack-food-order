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
} from "@mui/material";
import { useState } from "react";
import BreadCrumbs from "./BreadCrumbs";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddPhotoAlternate";

export default function AddMenu() {
  const [toppings, setToppings] = useState([
    { name: "Cheese", selected: true },
    { name: "Pepperoni", selected: false },
  ]);
  const [newTopping, setNewTopping] = useState("");
  const [openToppingDialog, setOpenToppingDialog] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleToggleTopping = (index) => {
    const updatedToppings = toppings.map((topping, i) =>
      i === index ? { ...topping, selected: !topping.selected } : topping
    );
    setToppings(updatedToppings);
  };

  const handleAddTopping = () => {
    setToppings([...toppings, { name: newTopping, selected: false }]);
    setNewTopping("");
    setOpenToppingDialog(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setUploadedImages([...uploadedImages, ...filesWithPreview]);
    },
  });

  const handleDeleteImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          backgroundColor: "blue",
          height: "100%",
          width: "100%",
          padding: 5,
        }}
      >
        {/* Red Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "red",
            width: "100%",
            maxWidth: "100%", // Set max width for red container
            overflow: "auto",
            height: "100%",
            padding: "20px", // Add padding inside red container
            boxSizing: "border-box",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 2, textAlign: "center" }} // Center the text horizontally
          >
            Add Menu Item
          </Typography>

          {/* Menu Form */}
          <Box component="form">
            <TextField
              label="Menu Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, maxWidth: "500px", margin: "0 auto" }} // Set max width and center
            />
            {/* Toppings Section */}
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
              Toppings
            </Typography>
            {toppings.map((topping, index) => (
              <FormControlLabel
                key={topping.name}
                control={
                  <Checkbox
                    checked={topping.selected}
                    onChange={() => handleToggleTopping(index)}
                  />
                }
                label={topping.name}
              />
            ))}
            <Button
              variant="outlined"
              onClick={() => setOpenToppingDialog(true)}
              sx={{
                mb: 2,
                maxWidth: "500px",
              }} // Set max width and center
            >
              Add New Topping
            </Button>
            {/* Price Input */}
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              sx={{ mb: 2, maxWidth: "500px", margin: "0 auto" }} // Set max width and center
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
                maxWidth: "400px", // Set a fixed width for the upload area
                margin: "0 auto", // Center the upload box
              }}
            >
              <input {...getInputProps()} />
              <AddIcon fontSize="large" color="action" />
              <Typography variant="body2">
                Drag and drop images here, or click to upload
              </Typography>
            </Box>

            {/* Display Uploaded Images */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {uploadedImages.map((file, index) => (
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
              color="primary"
              sx={{ mt: 2, width: "100px", margin: "0 auto", display: "block" }} // Center the button
            >
              Add Menu Item
            </Button>
          </Box>

          {/* Add Topping Dialog */}
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
              <Button onClick={() => setOpenToppingDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddTopping}
                variant="contained"
                color="primary"
              >
                Add Topping
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
