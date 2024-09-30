"use client";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllMenus } from "../actions/menu/getAllMenus";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Card({ data: data1 }: any) {
  const { data } = useQuery({
    queryKey: ["menus"],
    queryFn: () => getAllMenus(),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const router = useRouter();
  const handleNavigation: any = (id: any) => {
    if (data1?.isAuthenticated) {
      router.push(`menuDetail/${id}`);
    } else {
      router.push("/login");
    }
  };
  return (
    <>
      {data?.map((menu: any, index: any) => {
        return (
          <Box
            key={index}
            sx={{
              width: "max-content",
              height: "max-content",
              minWidth: "250px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 3,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src={menu.Picture[0]}
              width={300}
              height={300}
              alt="card"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                alignSelf: "center",
              }}
            />
            <Typography>{menu.name}</Typography>
            <Typography>{menu.toppings.join(", ")}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 1,
                borderBottom: "1px solid black",
              }}
            >
              <Typography>
                {menu.price}
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
              <Button onClick={() => handleNavigation(menu.id)}>Order</Button>
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
              <Typography>{menu.restaurant.name}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
