import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { connect, useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/user/userAction";
import { selectAccessToken } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

const UserList = ({ access_token }) => {
  const [fiteredUser, setfiteredUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // role === "bankReportViewer" &&
      dispatch(getUserData(access_token));

      // role === "bankReportViewer" &&
    };
    fetchData();
  }, [dispatch, access_token]);

  const UserData = useSelector((state) => state.user);
  const { user, loading } = UserData;

  const UserColumn = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    // {
    //   name: "Pr Cooperatives",
    //   selector: (row) => row.no_of_Total_Stablishing_Member,
    //   sortable: true,
    // },
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
  ];
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filterUser = user?.filter((item) =>
      search === ""
        ? item
        : item.fullName.toLowerCase().includes(search?.toLowerCase())
    );
    setfiteredUser(filterUser);
  }, [user, search]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white ">List of Users</h1>
      <div className="border-b-2 text-white my-4" />
      <div className="flex items-center justify-end md:mx-auto max-w-7xl">
        <div>
          <Link
            to={`/admin/users`}
            className="ui teal button whitespace-nowrap"
            style={{ backgroundColor: "#d1d424" }}
          >
            <i className="plus icon"></i>
            <span className="hidden md:inline-block">Register New User</span>
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
          data={fiteredUser}
          columns={UserColumn}
          loading={loading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  access_token: selectAccessToken,
});

export default connect(mapStateToProps)(UserList);
