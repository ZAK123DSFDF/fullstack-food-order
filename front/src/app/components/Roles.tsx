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
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BreadCrumbs from "./BreadCrumbs";

export default function RoleManagement() {
  const [dialogData, setDialogData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRole, setNewRole] = useState({
    roleName: "",
    permissions: {
      updateUser: false,
      deleteUser: false,
      addUser: false,
    },
  });

  const [roles, setRoles] = useState([
    {
      roleName: "Admin",
      createdAt: "2024-09-25",
      active: true,
      permissions: { updateUser: true, deleteUser: true, addUser: true },
    },
    {
      roleName: "Editor",
      createdAt: "2024-09-26",
      active: false,
      permissions: { updateUser: true, deleteUser: false, addUser: true },
    },
  ]);

  const handleToggleActive = (index) => {
    const updatedRoles = roles.map((role, idx) =>
      idx === index ? { ...role, active: !role.active } : role
    );
    setRoles(updatedRoles);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewRole((prevRole) => ({
      ...prevRole,
      [type === "checkbox" ? "permissions" : name]:
        type === "checkbox"
          ? { ...prevRole.permissions, [name]: checked }
          : value,
    }));
  };

  const handleAddNewRole = () => {
    setRoles((prevRoles) => [
      ...prevRoles,
      {
        ...newRole,
        createdAt: new Date().toISOString().split("T")[0],
        active: true,
      },
    ]);
    setOpenAddDialog(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "roleName",
        header: "Role Name",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
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
                onChange={() => handleToggleActive(row.index)}
                name="activeToggle"
              />

              <Typography sx={{ mr: 2 }}>
                {row.original.active ? "Active" : "Inactive"}
              </Typography>
            </Box>

            <IconButton
              onClick={() => {
                setDialogData(row.original);
                setIsEditMode(true);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => console.log("Delete action")}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [roles]
  );

  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "lightblue",
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
          <MaterialReactTable
            columns={columns}
            data={roles}
            renderTopToolbarCustomActions={() => (
              <Box sx={{ padding: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAddDialog(true)}
                >
                  Add New Role
                </Button>
              </Box>
            )}
          />
        </Box>
      </Box>

      {/* Add New Role Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="roleName"
            value={newRole.roleName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Typography sx={{ mt: 2 }}>Permissions:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={newRole.permissions.updateUser}
                onChange={handleInputChange}
                name="updateUser"
              />
            }
            label="Update User"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newRole.permissions.deleteUser}
                onChange={handleInputChange}
                name="deleteUser"
              />
            }
            label="Delete User"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newRole.permissions.addUser}
                onChange={handleInputChange}
                name="addUser"
              />
            }
            label="Add User"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddNewRole}
            color="primary"
            variant="contained"
          >
            Add Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* View/Edit Role Dialog */}
      <Dialog
        open={!!dialogData}
        onClose={() => setDialogData(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditMode
            ? `Edit Role: ${dialogData?.roleName}`
            : `Role: ${dialogData?.roleName}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="roleName"
            value={dialogData?.roleName}
            fullWidth
            disabled={!isEditMode}
            margin="normal"
          />
          <Typography sx={{ mt: 2 }}>Permissions:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={dialogData?.permissions.updateUser}
                name="updateUser"
                disabled={!isEditMode}
              />
            }
            label="Update User"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dialogData?.permissions.deleteUser}
                name="deleteUser"
                disabled={!isEditMode}
              />
            }
            label="Delete User"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dialogData?.permissions.addUser}
                name="addUser"
                disabled={!isEditMode}
              />
            }
            label="Add User"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogData(null)} color="secondary">
            Close
          </Button>
          {isEditMode && (
            <Button
              onClick={() => {
                console.log("Update role");
                setDialogData(null);
              }}
              color="primary"
              variant="contained"
            >
              Update Role
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
