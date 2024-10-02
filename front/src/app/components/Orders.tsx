"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import BreadCrumbs from "./BreadCrumbs";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestaurantOrders } from "../actions/order/getRestaurantOrders";
import { updateOrder } from "../actions/order/updateOrder";
import useLocalStorage from "@/utils/useLocalStorage";

export default function Orders() {
  const [dialogData, setDialogData] = useState(null);
  const { hasPermissionToViewOrders, hasPermissionToUpdateOrders } =
    useLocalStorage();
  const { data: data1 } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getRestaurantOrders(),
  });
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState([]);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleUpdate = (id: any, status: any) => {
    mutate({ id, status });
  };
  useEffect(() => {
    if (data1) {
      setOrderData(data1);
      console.log(orderData);
      setStatus(data1.map((order) => order.orderStatus || "PREPARING"));
    }
  }, [data1, orderData]);
  useEffect(() => {
    console.log(status);
  }, [status]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "menu.name",
        header: "Pizza Name",
      },
      {
        accessorKey: "toppings",
        header: "Toppings",
        Cell: ({ row }: any) => (
          <Button
            variant="text" // Use 'text' variant for no background
            onClick={() => setDialogData(row.original)}
            sx={{
              color: "orange",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ color: "orange" }}>
              <VisibilityIcon />
            </IconButton>
            Toppings
          </Button>
        ),
      },
      {
        accessorKey: "count",
        header: "Quantity",
      },
      {
        accessorKey: "customer.phoneNumber",
        header: "Customer Phone",
      },
      {
        accessorKey: "customer.name",
        header: "Customer Name",
      },
      {
        accessorKey: "customer.email",
        header: "Customer Email",
      },
      {
        accessorKey: "customer.location",
        header: "Customer Location",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
    ];
    if (hasPermissionToUpdateOrders) {
      baseColumns.push({
        accessorKey: "orderStatus",
        header: "Order Status",
        Cell: ({ row }: any) => {
          const rowIndex = row.index;
          return (
            <FormControl
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  textAlign: "right", // Align the label to the right
                  marginRight: "10px",
                },
              }}
            >
              <InputLabel shrink>Status</InputLabel>
              {status[rowIndex] !== "DELIVERED" ? (
                <Select
                  value={status[rowIndex] || row.original.orderStatus}
                  onChange={(e) => {
                    const updatedStatus = [...status];
                    updatedStatus[rowIndex] = e.target.value;
                    setStatus(updatedStatus);
                    handleUpdate(row.original.id, updatedStatus[rowIndex]);
                  }}
                  label=""
                  sx={{
                    backgroundColor:
                      status[rowIndex] === "PREPARING"
                        ? "orange"
                        : status[rowIndex] === "READY"
                        ? "darkgreen"
                        : status[rowIndex] === "DELIVERED"
                        ? "lightgreen"
                        : "inherit",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.875rem",
                    "& .MuiSelect-select": {
                      padding: "6px",
                    },
                  }}
                  displayEmpty
                >
                  <MenuItem value="PREPARING">PREPARING</MenuItem>
                  <MenuItem value="READY">READY</MenuItem>
                  <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                </Select>
              ) : (
                <Typography
                  sx={{
                    backgroundColor: "lightgreen",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}
                >
                  DELIVERED
                </Typography>
              )}
            </FormControl>
          );
        },
      });
    }

    return baseColumns;
  }, [hasPermissionToUpdateOrders, status]);
  const table = useMaterialReactTable({
    columns,
    data: orderData || [],
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{ fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}
      >
        Orders
      </Typography>
    ),
    enablePagination: false,
  });
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f8f8f8",
          padding: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            maxHeight: "calc(100% - 60px)",
            overflow: "auto",
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: 2,
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "0",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          {hasPermissionToViewOrders ? (
            <MaterialReactTable table={table} />
          ) : (
            "you dont have permission"
          )}
        </Box>
        <Dialog
          open={!!dialogData}
          onClose={() => setDialogData(null)}
          aria-labelledby="pizza-details-dialog"
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              padding: 4,
            },
          }}
        >
          {dialogData && (
            <>
              <DialogContent>
                <Typography sx={{ mt: 2 }}>
                  Toppings: {dialogData.toppings.join(", ")}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDialogData(null)}
                  variant="outlined"
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Box>
  );
}
