import { Box, Button, Typography } from "@mui/material";
import Card from "./Card";

export default function OrderHistory() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "red",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: 5,
        }}
      >
        <Typography>Pizza</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            margin: "0 auto",
          }}
        >
          <Typography>Home</Typography>
          <Typography>Order Us</Typography>
          <Typography>Who we are</Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 10 }}
      >
        <Typography>Order History</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Card mode="orderHistory" />
        </Box>
      </Box>
    </Box>
  );
}
