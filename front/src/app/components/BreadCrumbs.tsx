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
        padding: 3,
        backgroundColor: "#ffffff",
        height: "max-content",
        width: "100vw",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
        {pathArray[2]}
      </Typography>
    </Box>
  );
}
