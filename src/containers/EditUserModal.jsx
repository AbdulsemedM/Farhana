import React, { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

const EditUserModal = ({
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
    fullName: dataToEdit?.fullName,
    userName: dataToEdit?.userName,
    password: dataToEdit?.password,
    confirmPassword: dataToEdit?.password,
    email: dataToEdit?.email,
    phoneNumber: dataToEdit?.phoneNumber,
    role: "admin",
  });

  //   const handleImageChange = async (e) => {
  //     const file = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     const base64 = await convertToBase64(file);

  //     const previousData = cloneDeep(data); // Use cloneDeep from lodash
  //     const newData = {
  //       ...previousData,
  //       image: base64,
  //     };

  //     setData(newData);
  //     console.log(newData, "new one");
  //   };
  //   console.log(dataToEdit, "here");
  //   console.log(data, "there");
  //   console.log(access_token);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("data:", data);
    try {
      const response = await API.put(`/users/update/${dataToEdit?._id}`, data, {
        headers: {
          access_token: access_token,
        },
      }).then((res) => res);
      if (response.status === 200) {
        Alert("Data Updated successfully", "success");
        setData({
          fullName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          role: "admin",
        });
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }
      // console.log("Person registered successfully");
    } catch (error) {
      console.error("Failed to register person", error);
      Alert("Failed to Create User", "error");
    }
  };
  /////////////////////////////////////////
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
  //   console.log(dataToEdit)

  useEffect(() => {
    dataToEdit &&
      setData({
        fullName: dataToEdit?.fullName,
        userName: dataToEdit?.userName,
        // password: dataToEdit?.password,
        // confirmPassword: dataToEdit?.password,
        email: dataToEdit?.email,
        phoneNumber: dataToEdit?.phoneNumber,
        role: "admin",
      });
  }, [dataToEdit, access_token]);
  // console.log("id", selectedUnionId);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
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
        <form className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="text-lg font-semibold text-night"
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
                className="text-lg font-semibold text-night"
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
          {/* <div className="grid grid-cols-2 gap-2">
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-night"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={"text"}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                  required
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="text-md md:text-lg font-semibold text-night"
              >
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={"text"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                  required
                />
              </div>
              {data.password !== data.confirmPassword && (
                <div className="text-red mt-2">
                  Password and Confirm Password do not match.
                </div>
              )}
            </div> */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-lg font-semibold text-night"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className="mb-4 border border-night bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-lg font-semibold text-night"
              >
                Phone Number
              </label>
              <input
                type="phoneNumber"
                id="phoneNumber"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleInputChange}
                className="mb-4 border border-night bg-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                required
              />
            </div>
          </div>

          <div className="text-center font-bold p-4">
            <button
              disabled={data.password !== data.confirmPassword && true}
              type="submit"
              onClick={(event) => {
                handleSubmit(event);
              }}
              className="bg-gradient-to-r from-lime2 to-lime2 hover:from-lime2 hover:to-lime1 text-night py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:lime2 h-16 w-28"
            >
              Update
            </button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default EditUserModal;
