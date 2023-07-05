import React, { useState } from "react";
import img from "../constants";
import Navbar from "../containers/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Submitted");
    console.log("Username:", data.username);
    console.log("Password:", data.password);
    navigate("/admin")
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
            <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="text-lg font-semibold text-night"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={data.username}
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

export default Login;
