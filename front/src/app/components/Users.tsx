"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import BreadCrumbs from "./BreadCrumbs";
import { useForm, Controller } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllServants } from "../actions/user/getAllServants";
import { activateServant } from "../actions/user/activateServant";
import { deactivateServant } from "../actions/user/deactivateServant";
import { deleteServant } from "../actions/user/deleteServant";
import { getAllActiveRoles } from "../actions/role/getAllActiveRoles";
import { createServant } from "../actions/user/createServant";
import useLocalStorage from "@/utils/useLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";

export default function Users() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();
  const [hasTyped, setHasTyped] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilter, setColumnFilter] = useState<MRT_ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [del, setDel] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "",
      location: "",
    },
  });

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    reset();
  };
  const queryClient = useQueryClient();

  const globalSearc = searchParams.get("globalSearch");
  const name = searchParams.get("name");
  const phoneNumber = searchParams.get("phoneNumber");
  const email = searchParams.get("email");
  const location = searchParams.get("location");
  const actions = searchParams.get("actions");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const { data, isPending, isError } = useQuery({
    queryKey: [
      "allServants",
      globalSearc,
      name,
      phoneNumber,
      email,
      location,
      actions,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getAllServants(
        globalSearc,
        name,
        phoneNumber,
        email,
        location,
        actions,
        sortBy,
        sortOrder
      ),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const { mutate: addUser } = useMutation({
    mutationFn: createServant,
    onSuccess: (data) => {
      console.log(data);
      handleDialogClose();
      //@ts-ignore
      queryClient.invalidateQueries(["allServants"]);
    },
  });
  const { mutate: activate } = useMutation({
    mutationFn: activateServant,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries(["allServants"]);
    },
  });
  const { data: data1 } = useQuery({
    queryKey: ["activeRoles"],
    queryFn: () => getAllActiveRoles(),
    enabled: dialogOpen,
  });
  useEffect(() => {
    console.log(data1);
  }, [data1]);
  const { mutate: deactivate } = useMutation({
    mutationFn: deactivateServant,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries(["allServants"]);
    },
  });
  const { mutate: deleteServant1 } = useMutation({
    mutationFn: deleteServant,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries(["allServants"]);
    },
  });
  const onSubmit = (data: any) => {
    addUser({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      location: data.location,
      servantRoleId: data.role,
    });
  };
  const handleClick = (id: any, status: any) => {
    if (status) {
      deactivate(id);
    } else {
      activate(id);
    }
  };
  const handleDelete = (id: any) => {
    deleteServant1(id);
  };
  const {
    hasPermissionToViewUsers,
    hasPermissionToDeleteUser,
    hasPermissionToAddUser,
    hasPermissionToUpdateUser,
  } = useLocalStorage();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }: any) => (
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                height: "max-content",
                width: 150,
                padding: 1,
                backgroundColor: "hsl(34,34%,85%)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                borderRadius: "50px",
                opacity: !hasPermissionToUpdateUser ? 0.5 : 1,
              }}
            >
              <Switch
                checked={row.original.active}
                name="activeToggle"
                onClick={() =>
                  hasPermissionToUpdateUser &&
                  handleClick(row.original.id, row.original.active)
                }
                disabled={!hasPermissionToUpdateUser}
              />
              <Typography sx={{ mr: 2 }}>
                {row.original.active ? "Active" : "Inactive"}
              </Typography>
            </Box>
            <IconButton
              onClick={() => handleDelete(row.original.id)}
              disabled={!hasPermissionToDeleteUser}
              sx={{
                color: !hasPermissionToDeleteUser ? "gray" : "inherit",
                cursor: !hasPermissionToDeleteUser ? "not-allowed" : "pointer",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [hasPermissionToDeleteUser, hasPermissionToUpdateUser]
  );
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
            router.push(`/dashboard/users?${query.toString()}`);
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
              router.push(`/dashboard/users?${query.toString()}`);
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
            router.push(`/dashboard/users?${query.toString()}`);
          }
        }

        if (query.toString() !== "") {
          router.push(`/dashboard/users?${query.toString()}`);
        }
      }, 500);

      return () => clearTimeout(handle);
    }
  }, [columnFilter, globalSearch, hasTyped, router, sorting]);
  const table = useMaterialReactTable({
    columns,
    data: data || [],
    manualFiltering: true,
    manualSorting: true,
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
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          disabled={!hasPermissionToAddUser}
          sx={{
            backgroundColor: !hasPermissionToAddUser ? "gray" : "primary.main",
            cursor: !hasPermissionToAddUser ? "not-allowed" : "pointer",
          }}
        >
          Add New User
        </Button>
      </Box>
    ),
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

  const watchPassword = watch("password");

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
            backgroundColor: "white",
            borderRadius: "5px",
            padding: 2,
          }}
        >
          {hasPermissionToViewUsers ? (
            <MaterialReactTable table={table} />
          ) : (
            "you dont have permission to see this page"
          )}
        </Box>
      </Box>

      {/* Dialog for Adding New User */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box
            id="userForm"
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  label="Name"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Email"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("phoneNumber")}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <TextField
                  label="Location"
                  fullWidth
                  {...field}
                  onBlur={() => trigger("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    labelId="role-select-label"
                    fullWidth
                    {...field}
                    onBlur={() => trigger("role")}
                  >
                    {data1?.map((role: any) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.role && (
                <Typography variant="body2" color="error">
                  {errors.role.message}
                </Typography>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            form="userForm"
            color="primary"
            variant="contained"
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
