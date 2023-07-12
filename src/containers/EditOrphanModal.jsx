import React, { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { cloneDeep } from "lodash";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const EditOrphanModal = ({
  dispatched,
  access_token,
  setDispatched,
  title,
  dataToEdit,
}) => {
  const MySwal = withReactContent(Swal);
  let timerInterval;
  // console.log(dataToEdit)
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
    firstName: dataToEdit?.firstName,
    lastName: dataToEdit?.lastName,
    age: dataToEdit?.age,
    gender: dataToEdit?.gender,
    description: dataToEdit?.description,
    image: dataToEdit?.image,
  });
  const [selectedImage, setSelectedImage] = useState(null);

//   console.log(dataToEdit, "here");
//   console.log(data, "there");
//   console.log(access_token);
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // Handle form submission here
    // console.log("data:", data);
    try {
      const response = await API.put(
        `/orphan/update/${dataToEdit?._id}`,
        data,
        {
          headers: {
            access_token: access_token,
          },
        }
      ).then((res) => res);
      if (response.status === 200) {
        Alert("Data Updated successfully", "success");
        setData({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          description: "",
          image: "",
        });
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
        setSelectedImage(null);
      }
      console.log("Person registered successfully");
    } catch (error) {
      console.error("Failed to register person", error);
      Alert("Failed to Create User", "error");
    }
  };
  /////////////////////////////////////////

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
    console.log(newData, "new one");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  ////////////////////////////////////////

  // console.log("for", forType.for);

  //   useEffect(() => {
  //     dataToEdit &&
  //       setForType({
  //         for:
  //           dataToEdit?.prCooperative?.prCooperativeId ||
  //           role === "primaryCooperativeUser"
  //             ? "PrCooperative"
  //             : dataToEdit?.union?.unionId || role === "unionUser"
  //             ? "union"
  //             : dataToEdit?.federation?.federationId && "federation",
  //       });
  //   }, [dataToEdit, role]);

  //
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

  useEffect(() => {
    dataToEdit &&
      setData({
        firstName: dataToEdit?.firstName,
        lastName: dataToEdit?.lastName,
        age: dataToEdit?.age,
        gender: dataToEdit?.gender,
        description: dataToEdit?.description,
        image: dataToEdit?.image,
      });
  }, [dataToEdit, access_token]);
  // console.log("id", selectedUnionId);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
    !dispatched && setSelectedImage(null);
  }, [dispatched]);

  return (
    <Modal
      // dimmer={dimmer}
      open={open}
      size="small"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-blue">{title}</Modal.Header>
      <Modal.Content>
        <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="text-lg font-semibold text-night"
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
                className="text-lg font-semibold text-night"
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
              <label htmlFor="age" className="text-lg font-semibold text-night">
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
                className="text-lg font-semibold text-night"
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
              <label
                htmlFor="Photo"
                className="text-lg font-semibold text-night"
              >
                Photo
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 border border-night bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                
              />
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-64 h-64 object-cover"
                />
              ) : (
                <img
                  src={dataToEdit?.image}
                  alt="Selected"
                  className="w-64 h-64 object-cover"
                />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-night"
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
              onClick={() => {
                handleSubmit();
              }}
              className="bg-gradient-to-r from-lime2 to-lime2 hover:from-lime2 hover:to-lime1 text-night py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:lime2 h-16 w-28"
            >
              Register
            </button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

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

export default EditOrphanModal;
