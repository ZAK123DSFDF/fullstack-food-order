"use client";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllMenus } from "../actions/menu/getAllMenus";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllMenusExcluding } from "../actions/menu/getAllMenusExcluding";
import { getOrderHistory } from "../actions/order/getOrderHistory";

export default function Card({ id, mode, data: data1, data2 }: any) {
  const queryFn = () => {
    if (mode === "allData") {
      return getAllMenus();
    } else if (mode === "menuDetails") {
      return getAllMenusExcluding(id);
    } else if (mode === "orderHistory") {
      return getOrderHistory();
    }
  };
  const { data } = useQuery({
    queryKey: ["menus", mode],
    queryFn,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const router = useRouter();
  const handleNavigation: any = (id: any) => {
    if (data1?.isAuthenticated) {
      router.push(`menuDetail/${id}`);
    } else if (data2?.isAuthenticated) {
      router.push(`${id}`);
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
              src={
                mode === "orderHistory"
                  ? menu?.menu?.Picture[0]
                  : menu?.Picture[0]
              }
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
            <Typography>
              {mode === "orderHistory" ? menu?.menu?.name : menu?.name}
            </Typography>
            <Typography>
              {mode === "orderHistory"
                ? menu?.menu?.toppings.join(", ")
                : menu?.toppings.join(",")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 1,
                borderBottom: "1px solid black",
              }}
            >
              <Typography>
                {mode === "orderHistory" ? menu?.menu?.price : menu?.price}
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
              <Typography>
                {mode === "orderHistory"
                  ? menu?.menu?.restaurant?.name
                  : menu?.restaurant?.name}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
