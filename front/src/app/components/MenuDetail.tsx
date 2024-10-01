"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleMenu } from "../actions/menu/getSingleMenu";
import { createOrder } from "../actions/order/createOrder";

export default function MenuDetail({ data: data2 }: any) {
  const params = useParams();
  const [count, setCount] = useState(1);
  const { data } = useQuery({
    queryKey: ["singleMenu"],
    queryFn: () => getSingleMenu(params.id),
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [checkedToppings, setCheckedToppings] = useState<boolean[]>([]);
  useEffect(() => {
    if (data) {
      setSelectedImage(data.Picture[0]);
      const initialChecked = data.toppings?.map(() => false) || [];
      setCheckedToppings(initialChecked);
    }
  }, [data]);
  const handleImageSelect = (img: string) => {
    setSelectedImage(img);
  };
  const handleToppingChange = (index: number) => {
    const updatedCheckedToppings = [...checkedToppings];
    updatedCheckedToppings[index] = !updatedCheckedToppings[index];
    setCheckedToppings(updatedCheckedToppings);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleOrder = () => {
    const selectedToppings = data.toppings?.filter(
      (_, index) => checkedToppings[index]
    );
    mutate({ menuId: params.id, count, toppings: selectedToppings });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100vw",
        height: "100vh",
        backgroundColor: "blue",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-start" },
          justifyContent: "flex-start",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
          paddingY: 5,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Large Image Box */}
        <Box
          sx={{
            width: { xs: "100%", md: "500px" },
            height: { xs: "300px", md: "500px" },
            overflow: "hidden",
            borderRadius: "10px",
            border: "2px solid #ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={selectedImage}
            alt="Selected"
            width={500}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>

        {/* Thumbnails Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            overflowY: { xs: "auto", md: "auto" },
            height: { xs: "auto", md: "500px" },
            maxWidth: { xs: "100%", md: "200px" },
          }}
        >
          {data?.Picture.map((img, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "80px",
                minHeight: "80px",
                cursor: "pointer",
                border:
                  selectedImage === img ? "2px solid blue" : "2px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
                transition: "border 0.3s ease",
              }}
              onClick={() => handleImageSelect(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
          ))}
        </Box>

        {/* Toppings & Order Actions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>{data?.name}</Typography>

          {/* Toppings Selection */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
            }}
          >
            {data?.toppings?.map((topping, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkedToppings[index] || false}
                    onChange={() => handleToppingChange(index)}
                    sx={{ color: checkedToppings[index] ? "blue" : "default" }}
                  />
                }
                label={topping}
              />
            ))}
          </Box>

          {/* Quantity and Price */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                minWidth: 30,
                minHeight: 30,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => count > 1 && setCount((prev) => prev - 1)}
            >
              <Minus />
            </Box>
            <Typography>{count}</Typography>
            <Box
              sx={{
                minWidth: 30,
                minHeight: 30,
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setCount((prev) => prev + 1)}
            >
              <Plus />
            </Box>
            <Typography>
              {data?.price}
              <Typography
                component="span"
                sx={{
                  fontSize: "0.75em",
                  marginLeft: "4px",
                }}
              >
                birr
              </Typography>
            </Typography>
          </Box>

          <Button sx={{ alignSelf: "flex-start" }} onClick={handleOrder}>
            {isPending ? "ordering" : "order"}
          </Button>
        </Box>
      </Box>

      {/* Related Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "red",
          paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}
      >
        <Typography>Related</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
          }}
        >
          <Card mode="menuDetails" id={params.id} data2={data2} />
        </Box>
      </Box>

      {/* Success Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You've ordered the product successfully!</DialogTitle>
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
