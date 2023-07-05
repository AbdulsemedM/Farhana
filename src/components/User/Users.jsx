import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Users = () => {
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  // };
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
    console.log("Username:", data.fullName);
    console.log("Password:", data.userName);
    navigate("/user");
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">Add User</h1>
      <div className="border-b-2 text-white my-4"></div>
      <form
        className="max-w-3xl md:h-0 h-screen mx-4 md:mx-24"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="text-lg font-semibold text-white"
            >
              User Name
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
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="text-lg font-semibold text-white"
            >
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-3 items-center transform text-midnight hover:text-night"
                onClick={toggleShowPassword}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="text-md md:text-lg font-semibold text-white"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-3 items-center transform text-midnight hover:text-night"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
            {data.password !== data.confirmPassword && (
          <div className="text-red mt-2">
            Password and Confirm Password do not match.
          </div>
        )}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="mb-4 border border-white bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-lg font-semibold text-white">
              Phone Number
            </label>
            <input
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleInputChange}
              className="mb-4 border border-white bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
        </div>

       

        <div className="text-center font-bold p-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-lime1 to-lime2 hover:from-hover hover:to-white text-night py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:lime2 h-16 w-28"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Users;
