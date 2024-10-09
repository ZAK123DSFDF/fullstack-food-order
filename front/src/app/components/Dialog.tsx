"use client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
export default function DialogCom({
  newRole,
  setNewRole,
  openAddDialog,
  setOpenAddDialog,
  handleAddNewRole,
  isEditing,
  setIsEditing,
  roleId,
  setRoleId,
  data1,
  isPending,
  handleEditData,
}: any) {
  useLayoutEffect(() => {
    if (isEditing && data1) {
      // Populate form with existing role data for editing
      const updatedPermissions = {
        SEE_ORDERS: data1?.allowedActions.includes("SEE_ORDERS"),
        UPDATE_ORDERS: data1?.allowedActions.includes("UPDATE_ORDERS"),
        ADD_MENU: data1?.allowedActions.includes("ADD_MENU"),
        ADD_ROLE: data1?.allowedActions.includes("ADD_ROLE"),
        UPDATE_ROLE: data1?.allowedActions.includes("UPDATE_ROLE"),
        DELETE_ROLE: data1?.allowedActions.includes("DELETE_ROLE"),
        GET_ROLES: data1?.allowedActions.includes("GET_ROLES"),
        ADD_USER: data1?.allowedActions.includes("ADD_USER"),
        UPDATE_USER: data1?.allowedActions.includes("UPDATE_USER"),
        DELETE_USER: data1?.allowedActions.includes("DELETE_USER"),
        GET_USERS: data1?.allowedActions.includes("GET_USERS"),
      };

      setNewRole({
        roleName: data1.name,
        permissions: updatedPermissions,
      });
    }

    // Cleanup function to reset the form when modal closes or component unmounts
    return () => {
      setNewRole({
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
    };
  }, [isEditing, data1, setNewRole]);

  const handleCheck = () => {
    console.log(newRole);
  };
  return (
    <Dialog
      open={openAddDialog || isEditing}
      onClose={() => {
        setOpenAddDialog(false);
        setIsEditing(false);
        setRoleId(null);
        setNewRole({
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
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add New Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          name="roleName"
          value={newRole.roleName}
          onChange={(e) => {
            const { value } = e.target;
            setNewRole((prev: any) => ({ ...prev, roleName: value }));
          }}
          fullWidth
          margin="normal"
        />
        <Typography sx={{ mt: 2 }}>Permissions:</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.SEE_ORDERS}
              name="SEE_ORDERS"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    SEE_ORDERS: checked,
                  },
                }));
              }}
            />
          }
          label="See Orders"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.UPDATE_ORDERS}
              name="UPDATE_ORDERS"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    UPDATE_ORDERS: checked,
                  },
                }));
              }}
            />
          }
          label="Update Orders"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.ADD_MENU}
              name="ADD_MENU"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    ADD_MENU: checked,
                  },
                }));
              }}
            />
          }
          label="Add Menu"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.ADD_ROLE}
              name="ADD_ROLE"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    ADD_ROLE: checked,
                  },
                }));
              }}
            />
          }
          label="Add Role"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.UPDATE_ROLE}
              name="UPDATE_ROLE"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    UPDATE_ROLE: checked,
                  },
                }));
              }}
            />
          }
          label="Update Role"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.DELETE_ROLE}
              name="DELETE_ROLE"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    DELETE_ROLE: checked,
                  },
                }));
              }}
            />
          }
          label="Delete Role"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.GET_ROLES}
              name="GET_ROLES"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    GET_ROLES: checked,
                  },
                }));
              }}
            />
          }
          label="Get Roles"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.ADD_USER}
              name="ADD_USER"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    ADD_USER: checked,
                  },
                }));
              }}
            />
          }
          label="Add User"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.UPDATE_USER}
              name="UPDATE_USER"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    UPDATE_USER: checked,
                  },
                }));
              }}
            />
          }
          label="Update User"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.DELETE_USER}
              name="DELETE_USER"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    DELETE_USER: checked,
                  },
                }));
              }}
            />
          }
          label="Delete User"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newRole.permissions.GET_USERS}
              name="GET_USERS"
              sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                  color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onChange={(e) => {
                const { checked } = e.target;
                setNewRole((prev: any) => ({
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    GET_USERS: checked,
                  },
                }));
              }}
            />
          }
          label="Get Users"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenAddDialog(false);
            setIsEditing(false);
            setRoleId(null);
            setNewRole({
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
          }}
          sx={{ color: "#e57b0f" }}
        >
          Cancel
        </Button>
        <Button
          onClick={isEditing ? () => handleEditData(roleId) : handleAddNewRole}
          color="primary"
          sx={{ backgroundColor: "#e57b0f", color: "white" }}
        >
          {isEditing ? "Edit Role" : "Add Role"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
