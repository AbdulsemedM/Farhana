import React from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "../components/User/Settings";
import Build from "../components/User/Build";
import Analytics from "../components/User/Analytics";
import RootLayout from "../components/layouts/RootLayout";
import RegisterOrphan from "../components/User/RegisterOrphan";
import Users from "../components/User/Users";
import OrphanList from "../components/User/OrphanList";
import UserList from "../components/User/UserList";
import Dashboard from "../components/User/Dashboard";

const Admin = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="registerOrphan" element={<RegisterOrphan />} />
        <Route path="orphanList" element={<OrphanList />} />
        <Route path="users" element={<Users />} />
        <Route path="userList" element={<UserList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="build/:bID" element={<Build />} />
        <Route path="analytics/:aID" element={<Analytics />} />
      </Routes>
    </RootLayout>
  );
};

export default Admin;
