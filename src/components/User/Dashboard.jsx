import { connect, useDispatch, useSelector } from "react-redux";
import ReactDataTable from "../../containers/DataTable";
import { getMessageData } from "../../redux/user/userAction";
import { createStructuredSelector } from "reselect";
import { selectAccessToken } from "../../redux/user/userSelector";
import { useEffect, useState } from "react";
import { Popup } from "semantic-ui-react";
import DetailModal from "../../containers/DetailModals/DetailModal";
import DeleteMessageModal from "../../containers/DeleteMessageModal";

const Dashboard = ({ access_token }) => {
  const dispatch = useDispatch();
  const [dataToEdit, setDataToEdit] = useState();
  const [delete1, setDelete1] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      // role === "bankReportViewer" &&
      dispatch(getMessageData(access_token));

      // role === "bankReportViewer" &&
    };
    fetchData();
  }, [dispatch, access_token]);

  const MessageData = useSelector((state) => state.user);
  const { message, loading } = MessageData;

  const MessageColumn = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Sent",
      selector: (row) => {
        const createdAt = new Date(row.createdAt);
        return createdAt.toLocaleDateString();
      },
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span className="mx-2 cursor-pointer text-xl">
              <DetailModal row={row} users={true} />
            </span>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
      // button: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => {
                setDataToEdit(row);
                handleAssign();
                setDelete1(true);
              }}
            >
              <Popup
                content="Delete"
                trigger={<i className="delete text-red icon"></i>}
              />
            </span>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ">Dashboard</h1>
      <div className="border-b-2 my-4 text-white" />
      <div className="max-w-7xl md:h-0 h-screen mx-4 md:mx-auto ">
        <ReactDataTable 
        data={message}
        columns={MessageColumn}
        loading={loading}/>
      </div>
      {delete1 && (
        <DeleteMessageModal
          title="Delete Message"
          dataToEdit={dataToEdit}
          access_token={access_token}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  access_token: selectAccessToken,
});
export default connect(mapStateToProps)(Dashboard);
