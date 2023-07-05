import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterOrphan = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
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
    navigate("/user");
  };
  return (
    <div className="h-screen md:h-0 mr-4">
      <h1 className="font-semibold text-3xl text-white">Register Orphan</h1>
      <div class="border-b-2 my-4 text-white"></div>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="text-lg font-semibold text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="first"
              value={data.username}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="text-lg font-semibold text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="mb-4 max-w-[7rem]">
            <label htmlFor="age" className="text-lg font-semibold text-white">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={data.age}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
          </div>
          <div className="mb-4 max-w-[12rem]">
            <label
              htmlFor="gender"
              className="text-lg font-semibold text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="Photo" className="text-lg font-semibold text-white">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4 border border-white bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
              required
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-64 h-64 object-cover"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-lg font-semibold text-silver"
          >
            Description
          </label>
          <textarea
            id="description"
            className="border h-216 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
          ></textarea>
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

export default RegisterOrphan;
