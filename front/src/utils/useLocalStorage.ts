import { useEffect, useMemo, useState } from "react";

export default function useLocalStorage() {
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setInit(true);
  }, []);
  useEffect(() => {
    if (init) {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log("this is user data", user);
          setUserData(user);
        } else {
          console.log("No user data found in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [init]);
  const hasPermissionToViewUsers = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("GET_USERS"))
    );
  }, [userData]);
  const hasPermissionToDeleteUser = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("DELETE_USER"))
    );
  }, [userData]);
  const hasPermissionToUpdateUser = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("UPDATE_USER"))
    );
  }, [userData]);
  const hasPermissionToAddUser = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("ADD_USER"))
    );
  }, [userData]);
  const hasPermissionToViewOrders = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("SEE_ORDERS"))
    );
  }, [userData]);
  const hasPermissionToUpdateOrders = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("UPDATE_ORDERS"))
    );
  }, [userData]);
  const hasPermissionToAddMenu = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("ADD_MENU"))
    );
  }, [userData]);
  const hasPermissionToAddRole = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("ADD_ROLE"))
    );
  }, [userData]);
  const hasPermissionToUpdateRole = useMemo(() => {
    console.log(
      "this is from update",
      userData?.role === "ADMIN" ||
        (userData?.role === "SERVANT" &&
          userData?.active &&
          userData?.servantRole?.allowedActions?.includes("UPDATE_ROLE"))
    );
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("UPDATE_ROLE"))
    );
  }, [userData]);
  const hasPermissionToDeleteRole = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("DELETE_ROLE"))
    );
  }, [userData]);
  const hasPermissionToGetRoles = useMemo(() => {
    return (
      userData?.role === "ADMIN" ||
      (userData?.role === "SERVANT" &&
        userData?.active &&
        userData?.servantRole?.allowedActions?.includes("GET_ROLES"))
    );
  }, [userData]);
  return {
    hasPermissionToViewUsers,
    hasPermissionToViewOrders,
    hasPermissionToUpdateOrders,
    hasPermissionToDeleteUser,
    hasPermissionToUpdateUser,
    hasPermissionToAddUser,
    hasPermissionToAddMenu,
    hasPermissionToAddRole,
    hasPermissionToUpdateRole,
    hasPermissionToDeleteRole,
    hasPermissionToGetRoles,
  };
}
