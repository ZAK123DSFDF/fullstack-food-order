import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function Card() {
  return (
    <Box
      sx={{
        width: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 2,
        borderRadius: "10px",
      }}
    >
      <Image
        src="/pizza.svg"
        width={300}
        height={300}
        alt="card"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <Typography>margherita</Typography>
      <Typography>tomato,potato,vege,others...</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: 1,
          borderBottom: "1px solid black",
        }}
      >
        <Typography>
          150
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
        <Button>Order</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: 1,
        }}
      >
        <Box
          sx={{
            minWidth: 50,
            minHeight: 50,
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <Image
            src="/man2.jpg"
            fill
            alt="man"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Typography>Azmera Pizza</Typography>
      </Box>
    </Box>
  );
}
