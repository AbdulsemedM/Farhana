import ReactDataTable from "../../containers/DataTable";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ">Dashboard</h1>
      <div className="border-b-2 my-4 text-white"/>
      <ReactDataTable />
    </div>
  );
};

export default Dashboard;
