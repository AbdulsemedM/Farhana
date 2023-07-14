import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAccessToken } from "../../redux/user/userSelector";
import { getOrphanData } from "../../redux/user/userAction";
import DetailModal from "../../containers/DetailModals/DetailModal";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import EditOrphanModal from "../../containers/EditOrphanModal";
import DeleteOrphanModal from "../../containers/DeleteOrphanModal";

const OrphanList = ({ access_token }) => {
  const [delete1, setDelete1] = useState(false);
  const [fiteredOrphan, setfiteredOrphan] = useState([]);
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);

  const [dataToEdit, setDataToEdit] = useState();
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      // role === "bankReportViewer" &&
      dispatch(getOrphanData(access_token));

      // role === "bankReportViewer" &&
    };
    fetchData();
  }, [dispatch, access_token]);

  const UserData = useSelector((state) => state.user);
  const { orphan, loading } = UserData;

  const OrphanColumn = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Descripton",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "registered",
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
              <DetailModal row={row} users={false} />
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
                setDelete1(false);
              }}
            >
              <Popup
                content="Edit"
                trigger={<i className="edit text-lime2 icon"></i>}
              />
            </span>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
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

  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    const filter = orphan?.filter((item) =>
      search === ""
        ? item
        : item.firstName.toLowerCase().includes(search?.toLowerCase())
    );
    setfiteredOrphan(filter);
  }, [orphan, search]);

  return (
    <div>
      <div className="text-3xl text-white font-semibold">List of Orphans</div>
      <div className="border-b-2 my-4 text-white" />
      <div className="flex items-center justify-end max-w-7xl md:mx-auto">
        <div>
          <Link
            to={`/admin/registerOrphan`}
            className="ui teal button whitespace-nowrap"
            style={{ backgroundColor: "#d1d424" }}
          >
            <i className="plus icon"></i>
            <span className="hidden md:inline-block">Register New Orphan</span>
          </Link>
        </div>

        <div className="hidden m-3 md:flex">
          <div className="item">
            <div className="ui icon input">
              <input
                type="text"
                name="search"
                value={search}
                onChange={handleChange}
                placeholder="Search ..."
              />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl md:h-0 h-screen mx-4 md:mx-auto ">
        <ReactDataTable
          data={fiteredOrphan}
          columns={OrphanColumn}
          loading={loading}
        />
      </div>
      {!delete1 && (
        <EditOrphanModal
          title="Edit Orphan"
          dataToEdit={dataToEdit}
          edit={true}
          access_token={access_token}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
      {delete1 && (
        <DeleteOrphanModal
          title="Delete Orphan"
          dataToEdit={dataToEdit}
          edit={true}
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

export default connect(mapStateToProps)(OrphanList);
