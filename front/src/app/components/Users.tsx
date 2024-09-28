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
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import BreadCrumbs from "./BreadCrumbs";

export default function Users() {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      phoneNumber: "555-1234",
      email: "john@example.com",
      active: true,
      role: "Admin",
    },
    {
      name: "Jane Smith",
      phoneNumber: "555-5678",
      email: "jane@example.com",
      active: false,
      role: "Editor",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const handleToggleActive = (index) => {
    const updatedUsers = users.map((user, idx) =>
      idx === index ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    handleDialogClose();
  };

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
            <IconButton onClick={() => console.log("Delete action")}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [users]
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
            data={users}
            renderTopToolbarCustomActions={() => (
              <Box sx={{ padding: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDialogOpen}
                >
                  Add New User
                </Button>
              </Box>
            )}
          />
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
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
