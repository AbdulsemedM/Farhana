import { useState } from "react";
import { API } from "../../utils/API";
import { connect } from "react-redux";
import { selectAccessToken, selectRole } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { cloneDeep } from "lodash";

const RegisterOrphan = ({ access_token, role }) => {
  const MySwal = withReactContent(Swal);
  let timerInterval;
  const Alert = (message, icon) => {
    MySwal.fire({
      icon: icon,
      position: "top-end",
      html: message ? message : "message not returned",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    description: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    const base64 = await convertToBase64(file);

    const previousData = cloneDeep(data); // Use cloneDeep from lodash
    const newData = {
      ...previousData,
      image: base64,
    };

    setData(newData);
    // console.log(newData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    // console.log("data:", data);
    // console.log(access_token);
    try {
      const response = await API.post(`/orphan/register`, data, {
        headers: {
          access_token: access_token,
        },
      }).then((res) => res);
      if (response.status === 200) {
        Alert("user created successfully", "success");
        setData({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          description: "",
          image: null,
        });
        setSelectedImage(null);
      }
      // console.log("Person registered successfully");
    } catch (error) {
      console.error("Failed to register person", error);
      Alert("Failed to Create User", "error");
    }
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
              name="firstName"
              value={data.firstName}
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
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
            name="description"
            value={data.description}
            onChange={handleInputChange}
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
const mapStateToProps = createStructuredSelector({
  access_token: selectAccessToken,
  role: selectRole,
});

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
export default connect(mapStateToProps)(RegisterOrphan);
