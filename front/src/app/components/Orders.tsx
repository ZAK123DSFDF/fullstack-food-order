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
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

export default function Orders() {
  const [dialogData, setDialogData] = useState(null);
  const [status, setStatus] = useState("preparing");

  // Dummy Data
  const data = useMemo(
    () => [
      {
        pizzaName: "Margherita",
        toppings: ["Cheese", "Tomato"],
        quantity: 2,
        customerPhone: "555-1234",
        createdAt: "2024-09-25",
      },
      {
        pizzaName: "Pepperoni",
        toppings: ["Pepperoni", "Cheese"],
        quantity: 1,
        customerPhone: "555-5678",
        createdAt: "2024-09-26",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "pizzaName",
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
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "customerPhone",
        header: "Customer Phone",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "status",
        header: "Order Status",
        Cell: () => (
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="ready">Ready</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        ),
      },
    ],
    [status]
  );

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
          <MaterialReactTable columns={columns} data={data} />
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
              <DialogTitle id="pizza-details-dialog">
                {dialogData.pizzaName}
              </DialogTitle>
              <DialogContent>
                <Typography sx={{ mt: 2 }}>
                  Toppings: {dialogData.toppings.join(", ")}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Quantity: {dialogData.quantity}
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
