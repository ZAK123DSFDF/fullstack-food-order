"use client";
import { Box, Typography } from "@mui/material";
import {
  CalendarArrowUp,
  LogOut,
  Menu,
  PanelRightClose,
  Pizza,
  User,
  UsersRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathName = usePathname();
  const pathArray = pathName.split("/");
  const [path, setPath] = useState("");
  const router = useRouter();
  useEffect(() => {
    setPath(pathArray[2]);
  }, [pathName]);
  const handleNavigation = (route: any) => {
    router.push(route);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 250,
        backgroundColor: "red",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "max-content",
          padding: 2,
          backgroundColor: "blue",
        }}
      >
        <Typography>PIZZA</Typography>
        <Menu />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "max-content",
          padding: 10,
          backgroundColor: "violet",
        }}
      >
        <Typography>PIZZA</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingY: 2,
          paddingX: 0.3,
          backgroundColor: "green",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "blue",
            width: "90%",
            height: 50,
            marginBottom: 2,
            alignSelf: "center",
            position: "absolute",
            zIndex: -1,
            bottom: -14,
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "orders" ? "gray" : "transparent",
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/orders")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: path === "orders" ? "blue" : "transparent",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            <CalendarArrowUp />
            <Typography>Orders</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "addMenu" ? "gray" : "transparent",
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/addMenu")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: path === "addMenu" ? "blue" : "transparent",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            <Pizza />
            <Typography>Add menu</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "roles" ? "gray" : "transparent",
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/roles")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: path === "roles" ? "blue" : "transparent",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            <UsersRound />
            <Typography>Roles</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",

            width: "100%",
            backgroundColor: path === "users" ? "gray" : "transparent",
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/users")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: path === "users" ? "blue" : "transparent",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            <User />
            <Typography>Users</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
          marginTop: 2,
          cursor: "pointer",
        }}
      >
        <LogOut />
        <Typography>Logout</Typography>
      </Box>
    </Box>
  );
}
