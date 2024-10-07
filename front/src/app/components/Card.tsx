"use client";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllMenus } from "../actions/menu/getAllMenus";
import { useCallback, useEffect } from "react";
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

  const { data, isLoading } = useQuery({
    queryKey: ["menus", mode],
    queryFn,
    refetchOnWindowFocus: false,
  });

  const router = useRouter();
  const handleNavigation: any = (id: any) => {
    if (mode === "orderHistory") {
      return;
    } else if (mode !== "orderHistory") {
      if (data1?.isAuthenticated) {
        router.push(`menuDetail/${id}`);
      } else if (data2?.isAuthenticated) {
        router.push(`${id}`);
      } else {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {mode === "orderHistory" && (!data || data.length === 0) ? (
        <Typography variant="h6" align="center" sx={{ marginY: 3 }}>
          No orders found
        </Typography>
      ) : (
        data?.map((menu: any, index: any) => {
          return (
            <Box
              key={index}
              sx={{
                width: "max-content",
                height: "max-content",
                minWidth: "300px",
                maxWidth: "300px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                padding: 3,
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <>
                <Image
                  src={
                    mode === "orderHistory"
                      ? menu?.menu?.Picture[0].replace(
                          /\.(jpg|jpeg|png)$/i,
                          ".webp"
                        )
                      : menu?.Picture[0].replace(/\.(jpg|jpeg|png)$/i, ".webp")
                  }
                  width={300}
                  loader={({ src }) => {
                    return src;
                  }}
                  loading="lazy"
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
                <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                  {mode === "orderHistory" ? menu?.menu?.name : menu?.name}
                </Typography>
                <Typography sx={{ fontWeight: "thin" }}>
                  {mode === "orderHistory"
                    ? menu?.menu?.toppings.join(", ")
                    : menu?.toppings.join(",")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 1,
                    borderBottom: "1px solid #cccccc",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#01c550",
                      fontSize: 30,
                    }}
                  >
                    {mode === "orderHistory" ? menu?.menu?.price : menu?.price}
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.5em",
                        marginLeft: "4px",
                        color: "black",
                      }}
                    >
                      birr
                    </Typography>
                  </Typography>
                  <Button
                    onClick={() => handleNavigation(menu.id)}
                    sx={{
                      backgroundColor:
                        mode === "orderHistory" ? "transparent" : "#e57b0f",
                      color:
                        mode === "orderHistory"
                          ? menu?.menu.orderStatus !== "DELIVERED"
                            ? "#ffa500"
                            : "#008000"
                          : "white",

                      padding: 1,
                      fontSize: "1.2rem",
                      borderRadius: "5px",
                    }}
                  >
                    {mode === "orderHistory" ? (
                      menu?.menu?.orderStatus !== "DELIVERED" ? (
                        <Typography sx={{ fontWeight: "bold" }}>
                          ORDERED
                        </Typography>
                      ) : (
                        <Typography sx={{ fontWeight: "bold" }}>
                          RECEIVED
                        </Typography>
                      )
                    ) : (
                      "Order"
                    )}
                  </Button>
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
                      loader={({ src }) => {
                        return src;
                      }}
                      loading="lazy"
                      src="/man2.jpg"
                      fill
                      alt="man"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {mode === "orderHistory"
                      ? menu?.menu?.restaurant?.name
                      : menu?.restaurant?.name}
                  </Typography>
                </Box>
              </>
            </Box>
          );
        })
      )}
    </>
  );
}
