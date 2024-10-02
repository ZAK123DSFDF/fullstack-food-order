"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Switch,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BreadCrumbs from "./BreadCrumbs";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../actions/role/getAllRoles";
import { createRole } from "../actions/role/createRole";
import DialogCom from "./Dialog";
import { getSingleRole } from "../actions/role/getSingleRole";
import { updateRole } from "../actions/role/updateRole";
import { activateRole } from "../actions/role/activateRole";
import { deactivateRole } from "../actions/role/deactivateRole";
import { deleteRole } from "../actions/role/deleteRole";
import useLocalStorage from "@/utils/useLocalStorage";

export default function RoleManagement() {
  const [dialogData, setDialogData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [roleId, setRoleId] = useState(null);

  const [newRole, setNewRole] = useState({
    roleName: "",
    permissions: {
      SEE_ORDERS: false,
      UPDATE_ORDERS: false,
      ADD_MENU: false,
      ADD_ROLE: false,
      UPDATE_ROLE: false,
      DELETE_ROLE: false,
      GET_ROLES: false,
      ADD_USER: false,
      UPDATE_USER: false,
      DELETE_USER: false,
      GET_USERS: false,
    },
  });

  const queryClient = new QueryClient();
  const { mutate } = useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries["allRoles"];
    },
  });
  const handleAddNewRole = () => {
    console.log(newRole);
    console.log(Object.entries(newRole.permissions));
    if (newRole.roleName.trim() === "") {
      console.log("You need to type something for the role name.");
      return;
    }
    const hasSelectedPermission = Object.values(newRole.permissions).some(
      (value) => value === true
    );

    if (!hasSelectedPermission) {
      console.log("You should at least select one permission.");
      return;
    }
    const selectedPermissions = Object.entries(newRole.permissions)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
    mutate({ name: newRole.roleName, allowedActions: selectedPermissions });
    setOpenAddDialog(false);
  };
  const { data } = useQuery({
    queryKey: ["allRoles"],
    queryFn: () => getAllRoles(),
  });
  const { data: data1, isPending } = useQuery({
    queryKey: ["getSingleRole"],
    queryFn: () => getSingleRole(roleId),
    enabled: !!roleId,
  });
  const { mutate: mutate1 } = useMutation({
    mutationFn: updateRole,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries["allRoles"];
    },
  });
  const { mutate: activate } = useMutation({
    mutationFn: activateRole,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries["allRoles"];
    },
  });
  const { mutate: deactivate } = useMutation({
    mutationFn: deactivateRole,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries["allRoles"];
    },
  });
  const { mutate: deleteId } = useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries["allRoles"];
    },
  });
  const handleDelete = (id: any) => {
    deleteId(id);
  };
  const handleToggle = (id: any, state: any) => {
    if (state) {
      deactivate(id);
    } else {
      activate(id);
    }
  };
  const handleEditData = (id: any) => {
    console.log(newRole);
    console.log(Object.entries(newRole.permissions));
    if (newRole.roleName.trim() === "") {
      console.log("You need to type something for the role name.");
      return;
    }
    const hasSelectedPermission = Object.values(newRole.permissions).some(
      (value) => value === true
    );

    if (!hasSelectedPermission) {
      console.log("You should at least select one permission.");
      return;
    }
    const selectedPermissions = Object.entries(newRole.permissions)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
    console.log(newRole);
    mutate1({
      name: newRole.roleName,
      allowedActions: selectedPermissions,
      id,
    });
    setIsEditing(false);
  };
  useEffect(() => {
    console.log(data1);
  }, [data1]);
  const {
    hasPermissionToAddRole,
    hasPermissionToDeleteRole,
    hasPermissionToGetRoles,
    hasPermissionToUpdateRole,
  } = useLocalStorage();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "active",
        header: "Actions",
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
              }}
            >
              <Switch
                checked={row.original.active}
                name="activeToggle"
                onClick={() =>
                  handleToggle(row.original.id, row.original.active)
                }
                disabled={!hasPermissionToUpdateRole}
              />

              <Typography sx={{ mr: 2 }}>
                {row.original.active ? "Active" : "Inactive"}
              </Typography>
            </Box>

            <IconButton
              onClick={() => {
                setDialogData(row.original);
                setIsEditing(true);
                setRoleId(row.original.id);
              }}
              disabled={!hasPermissionToUpdateRole}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.original.id)}
              disabled={!hasPermissionToDeleteRole}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [hasPermissionToUpdateRole, hasPermissionToDeleteRole]
  );

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    renderTopToolbarCustomActions: () => (
      <Button
        onClick={() => setOpenAddDialog(true)}
        variant="contained"
        color="primary"
        disabled={!hasPermissionToAddRole}
      >
        Add New Role
      </Button>
    ),
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
            backgroundColor: "white",
            borderRadius: "5px",
            padding: 2,
          }}
        >
          {hasPermissionToGetRoles ? (
            <MaterialReactTable table={table} />
          ) : (
            "you dont have permission to see this"
          )}
        </Box>
      </Box>
      <DialogCom
        newRole={newRole}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setNewRole={setNewRole}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        handleAddNewRole={handleAddNewRole}
        roleId={roleId}
        setRoleId={setRoleId}
        data1={data1}
        isPending={isPending}
        handleEditData={handleEditData}
      />
    </Box>
  );
}
