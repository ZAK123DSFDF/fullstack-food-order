"use client";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
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
import { getLogout } from "../actions/user/getLogout";
import Image from "next/image";

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
  const { mutate } = useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
  });
  const handleLogOut = () => {
    mutate();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 280,
        backgroundColor: "#fcfcfc",
        height: "100vh",
        boxShadow: "4px 0px 8px rgba(186, 155, 155, 1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "max-content",
          padding: 3,
          backgroundColor: "#fcfcfc",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>PIZZA</Typography>
        <Menu />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "max-content",
          padding: 4,
          backgroundColor: "#fff8f2",
        }}
      >
        <Image
          loader={({ src }) => {
            return src;
          }}
          loading="lazy"
          src="/pizzalogo.svg"
          width={70}
          height={70}
          alt="pizza"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingY: 2,
          paddingX: 0.3,
          backgroundColor: "#fcfcfc",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent", // Remove background
            borderBottom: "1px solid lightgray", // Add 1px soft gray border at the bottom
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
            backgroundColor: path === "orders" ? "#ffcd99" : "transparent",
            paddingY: 1,
            borderRadius: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/orders")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderLeft: path === "orders" ? "4px solid #ff8100" : "none",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            {path === "orders" ? (
              <CalendarArrowUp color="#ff8100" />
            ) : (
              <CalendarArrowUp />
            )}
            <Typography sx={{ color: path === "orders" ? "#ff8100" : "black" }}>
              Orders
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "addMenu" ? "#ffcd99" : "transparent",
            borderRadius: 1,
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/addMenu")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderLeft: path === "addMenu" ? "4px solid #ff8100" : "none",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            {path === "addMenu" ? <Pizza color="#ff8100" /> : <Pizza />}
            <Typography
              sx={{ color: path === "addMenu" ? "#ff8100" : "black" }}
            >
              Add menu
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            backgroundColor: path === "roles" ? "#ffcd99" : "transparent",
            paddingY: 1,
            borderRadius: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/roles")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderLeft: path === "roles" ? "4px solid #ff8100" : "none",
              display: "flex",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            {path === "roles" ? <UsersRound color="#ff8100" /> : <UsersRound />}
            <Typography sx={{ color: path === "roles" ? "#ff8100" : "black" }}>
              Roles
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            borderRadius: 1,
            width: "100%",
            backgroundColor: path === "users" ? "#ffcd99" : "transparent",
            paddingY: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/dashboard/users")}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              borderLeft: path === "users" ? "4px solid #ff8100" : "none",
              paddingX: 8,
              gap: 1.5,
            }}
          >
            {path === "users" ? <User color="#ff8100" /> : <User />}
            <Typography sx={{ color: path === "users" ? "#ff8100" : "black" }}>
              Users
            </Typography>
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
        onClick={handleLogOut}
      >
        <LogOut size={30} color="red" />
        <Typography sx={{ fontSize: "20px", color: "red" }}>Logout</Typography>
      </Box>
    </Box>
  );
}
