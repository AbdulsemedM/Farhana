import React from "react";
import ReactDataTable from "../../containers/DataTable";

const OrphanList = () => {
  return (
    <div>
      <div className="text-3xl text-white font-semibold">List of Orphans</div>
      <div className="border-b-2 my-4 text-white"/>
      <ReactDataTable />
    </div>
  );
};

export default OrphanList;
