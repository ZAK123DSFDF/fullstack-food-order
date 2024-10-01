"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestaurantOrders } from "../actions/order/getRestaurantOrders";
import { updateOrder } from "../actions/order/updateOrder";

export default function Orders() {
  const [dialogData, setDialogData] = useState(null);

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
  const columns = useMemo(
    () => [
      {
        accessorKey: "menu.name",
        header: "Pizza Name",
      },
      {
        accessorKey: "toppings",
        header: "Toppings",
        Cell: ({ row }: any) => (
          <Button
            variant="contained"
            onClick={() => setDialogData(row.original)}
          >
            View Toppings
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
        header: "Customer name",
      },
      {
        accessorKey: "customer.email",
        header: "Customer email",
      },
      {
        accessorKey: "customer.location",
        header: "Customer Location",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "orderStatus",
        header: "Order Status",
        Cell: ({ row }: any) => {
          const rowIndex = row.index; // Get the index of the current row
          return (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status[rowIndex] || row.original.orderStatus}
                onChange={(e) => {
                  const updatedStatus = [...status];
                  updatedStatus[rowIndex] = e.target.value;
                  setStatus(updatedStatus);
                  handleUpdate(row.original.id, updatedStatus[rowIndex]);
                }}
                label="Status"
              >
                <MenuItem value="PREPARING">PREPARING</MenuItem>
                <MenuItem value="READY">READY</MenuItem>
                <MenuItem value="DELIVERED">DELIVERED</MenuItem>
              </Select>
            </FormControl>
          );
        },
      },
    ],
    [status]
  );
  const table = useMaterialReactTable({
    columns,
    data: orderData || [],
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{ fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}
      >
        Live Book Status
      </Typography>
    ),
  });
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "violet",
          padding: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            maxHeight: "calc(100% - 60px)", // Adjust height based on padding
            overflow: "auto",
            boxSizing: "border-box", // Ensures padding is included in width/height
            backgroundColor: "red",
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
              borderRadius: "0", // Set to 0 to remove the border radius
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          <MaterialReactTable table={table} />
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
              border: "2px solid #000",
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
