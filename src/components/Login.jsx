import React, { useEffect, useState } from "react";
import img from "../constants";
import Navbar from "../containers/Navbar";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/API";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { setRole, setToken, setUserProfile } from "../redux/user/userAction";

const Login = ({ setRole, setProfile, setAccessToken }) => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  // const [accessToken, setAccessToken] = useState();
  const [message, setMessage] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken("");
    setRole("");
    setProfile({});
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    try {
      // console.log("data", data);
      const response = await API.post("/auth/signin", data).then((res) => res);
      console.log(response.data);
      if (response.status === 200) {
        const access_token = response.data.token;
        const decoded = jwtDecode(access_token);
        console.log(decoded?.id);
        console.log(access_token);
        setAccessToken(access_token);
        setRole(response.data.role);
        setProfile(response.data);
        navigate("/admin");

        // console.log(decoded);

        // const rememberMe = event.target.elements.rememberMe.checked;
        // if (rememberMe) {
        //   localStorage.setItem("userName", data.userName);
        //   localStorage.setItem("password", data.password);
        // }
      }
    } catch (error) {
      // console.log(error.response);
      if (error.code === "ERR_BAD_REQUEST") {
        setMessage("Wrong userName or password");
      } else if (error.code === "ERR_NETWORK") {
        setMessage("Network Error");
      } else {
        setMessage("Something went wrong");
      }
      // setLoading(false);
      console.log(message);
    }

    // console.log("Submitted");
    // console.log("UserName:", data.userName);
    // console.log("Password:", data.password);
  };

  return (
    <div className="bg-night flex flex-col justify-center">
      <div className="py-4 " />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="py-8" />
      <div className="flex justify-end mx-12">
        <div className=" bg-midnight border-2  rounded-3xl">
          <div className="flex items-center justify-center px-32">
            <img src={img.logo} alt="" className="h-52" />
          </div>
          <section className="p-8">
            <h2 className="text-2xl font-bold text-center text-night mb-4">
              Login
            </h2>
            <h1 className="text-red text-sm">{message ? message : ""}</h1>
            <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="text-lg font-semibold text-night"
                >
                  UserName
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={data.userName}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold text-night"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                  required
                />
              </div>

              <div className="text-center font-bold p-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-lime1 to-lime2 hover:from-hover hover:to-white text-night py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:lime2 h-16 w-28"
                >
                  Login
                </button>
              </div>
            </form>
          </section>
        </div>
        {/* <div className="p-4"></div> */}
      </div>
      <div className="py-64" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAccessToken: (item) => dispatch(setToken(item)),
  setProfile: (item) => dispatch(setUserProfile(item)),
  setRole: (item) => dispatch(setRole(item)),
});

export default connect(null, mapDispatchToProps)(Login);
