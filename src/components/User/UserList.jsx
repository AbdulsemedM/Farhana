import React from "react";
import ReactDataTable from "../../containers/DataTable";

const UserList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white ">List of Users</h1>
      <div className="border-b-2 text-white my-4" />
      <div className="max-w-7xl md:h-0 h-screen mx-4 md:mx-auto ">
        <ReactDataTable />
      </div>
    </div>
  );
};

export default UserList;
