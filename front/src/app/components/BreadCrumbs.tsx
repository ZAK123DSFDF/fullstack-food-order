"use client";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const pathArray = pathName.split("/");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        padding: 2,
        backgroundColor: "green",
        height: "max-content",
        width: "100vw",
      }}
    >
      <Typography>{pathArray[2]}</Typography>
    </Box>
  );
}
