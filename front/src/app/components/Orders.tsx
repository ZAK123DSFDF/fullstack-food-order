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
  MRT_ColumnFiltersState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestaurantOrders } from "../actions/order/getRestaurantOrders";
import { updateOrder } from "../actions/order/updateOrder";
import useLocalStorage from "@/utils/useLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Orders() {
  const [dialogData, setDialogData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilter, setColumnFilter] = useState<MRT_ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [del, setDel] = useState(false);
  const router = useRouter();
  const { hasPermissionToViewOrders, hasPermissionToUpdateOrders } =
    useLocalStorage();
  const globalSearc = searchParams.get("globalSearch");
  const menuName = searchParams.get("menuname");
  const menuPrice = searchParams.get("menuprice");
  const count = searchParams.get("count");
  const customerPhoneNumber = searchParams.get("customerphoneNumber");
  const customerName = searchParams.get("customername");
  const customerEmail = searchParams.get("customeremail");
  const customerLocation = searchParams.get("customerLocation");
  const orderStatus = searchParams.get("orderStatus");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  const {
    data: data1,
    isPending,
    isError,
  } = useQuery({
    queryKey: [
      "orders",
      globalSearc,
      orderStatus,
      menuName,
      count,
      menuPrice,
      customerName,
      customerEmail,
      customerPhoneNumber,
      customerLocation,
    ],
    queryFn: () =>
      getRestaurantOrders(
        globalSearc,
        orderStatus,
        menuName,
        count,
        menuPrice,
        customerName,
        customerEmail,
        customerPhoneNumber,
        customerLocation
      ),
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
      setStatus(data1.map((order: any) => order.orderStatus || "PREPARING"));
    }
  }, [data1, orderData]);
  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    if (hasTyped) {
      const handle = setTimeout(() => {
        const query = new URLSearchParams();
        if (globalSearch) {
          query.set("globalSearch", globalSearch);
        } else {
          query.delete("globalSearch");
          setDel(true);
          if (del) {
            router.push(`/dashboard/orders?${query.toString()}`);
          }
        }
        columnFilter.forEach((filter) => {
          if (filter.value) {
            const key = filter.id.replace(".", "");
            query.set(key, filter.value as string);
          } else {
            const key = filter.id.replace(".", "");
            query.delete(key);
            setDel(true);
            if (del) {
              router.push(`/dashboard/orders?${query.toString()}`);
            }
          }
        });
        if (sorting.length > 0) {
          const { id, desc } = sorting[0];
          if (id) {
            const sortByKey = id.replace(".", "");
            query.set("sortBy", sortByKey);
            query.set("sortOrder", desc ? "desc" : "asc");
          }
        } else {
          query.delete("sortBy");
          query.delete("sortOrder");
          setDel(true);
          if (del) {
            router.push(`/dashboard/orders?${query.toString()}`);
          }
        }

        if (query.toString() !== "") {
          router.push(`/dashboard/orders?${query.toString()}`);
        }
      }, 500);

      return () => clearTimeout(handle);
    }
  }, [columnFilter, globalSearch, hasTyped, router, sorting]);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "menu.name",
        header: "Pizza Name",
      },
      { accessorKey: "menu.price", header: "Price" },
      {
        accessorKey: "toppings",
        header: "Toppings",

        Cell: ({ row }: any) => (
          <Button
            variant="text"
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
                  textAlign: "right",
                  marginRight: "10px",
                },
              }}
            >
              <InputLabel shrink>Status</InputLabel>
              {status[rowIndex] !== "DELIVERED" ? (
                <Select
                  value={status[rowIndex] || row.original.orderStatus}
                  onChange={(e) => {
                    const updatedStatus: any = [...status];
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
  }, [hasPermissionToUpdateOrders, status, handleUpdate]);
  const table = useMaterialReactTable({
    columns,
    data: orderData || [],
    onColumnFiltersChange: (filters) => {
      setHasTyped(true);
      setColumnFilter(filters);
    },
    onGlobalFilterChange: (filters) => {
      setHasTyped(true);
      setGlobalSearch(filters);
    },
    onSortingChange: (sorting) => {
      setHasTyped(true);
      setSorting(sorting);
    },
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{ fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}
      >
        Orders
      </Typography>
    ),
    enablePagination: false,
    state: {
      //@ts-ignore
      columnFilter,
      sorting,
      globalSearch,
      isPending,
      showAlertBanner: isError,
      showProgressBars: isPending,
    },
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
          {hasPermissionToViewOrders && !loading ? (
            <Box
              sx={{
                width: "100%",
                maxHeight: "100%",
                overflow: "auto",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <MaterialReactTable table={table} />
            </Box>
          ) : loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <Image
                loader={({ src }) => {
                  return src;
                }}
                loading="lazy"
                width={30}
                height={30}
                alt="loading"
                src="/spinner.svg"
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <Typography>You don't have permission to see this</Typography>
            </Box>
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
