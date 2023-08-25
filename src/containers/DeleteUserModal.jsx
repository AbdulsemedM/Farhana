import React, { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { cloneDeep } from "lodash";

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

const DeleteUserModal = ({
  dispatched,
  access_token,
  setDispatched,
  title,
  dataToEdit,
}) => {
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
    fullName: dataToEdit?.fullName,
    userName: dataToEdit?.userName,
    // password: dataToEdit?.password,
    // confirmPassword: dataToEdit?.password,
    email: dataToEdit?.email,
    phoneNumber: dataToEdit?.phoneNumber,
    role: "admin",
  });
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  //   const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      Swal.fire({
        title: "Do you want to proceed",
        icon: "warning",
        iconHtml: "?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await API.delete(
            `/users/delete/${dataToEdit?._id}`,
            {
              headers: {
                access_token: access_token,
              },
            }
          );
          if (response.status === 200) {
            Alert("Data Deleted successfully", "success");
            setData({
              fullName: "",
              userName: "",
              email: "",
              phoneNumber: "",
              role: "admin",
            });
            dispatch({ type: "CLOSE_MODAL" });
            setDispatched(false);
            // console.log("Person deleted successfully");

            // setSelectedImage(null);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
    } catch (error) {
      console.error("Failed to delete person", error);
      Alert("Failed to Delete User", "error");
    }
  };

  //   const handleImageChange = async (e) => {
  //     const file = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     const base64 = await convertToBase64(file);

  //     const newData = {
  //       ...data,
  //       image: base64,
  //     };

  //     setData(newData);
  //   };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
  });

  //   useEffect(() => {
  //     dataToEdit &&
  //       setData({
  //         firstName: dataToEdit?.firstName || "",
  //         lastName: dataToEdit?.lastName || "",
  //         age: dataToEdit?.age || "",
  //         gender: dataToEdit?.gender || "",
  //         description: dataToEdit?.description || "",
  //         image: dataToEdit?.image || "",
  //       });
  //   }, [dataToEdit, access_token]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
    // !dispatched && setSelectedImage(null);
  }, [dispatched]);

  return (
    <Modal
      open={state.open}
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
                disabled
                id="fullName"
                name="fullName"
                value={data.fullName}
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
                disabled
                name="userName"
                value={data.userName}
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-night"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={"text"}
                disabled
                  id="password"
                  name="password"
                  value={data.password}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                  required
                />
              </div>
            </div> */}
            {/* <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="text-md md:text-lg font-semibold text-night"
              >
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={"text"}
                disabled
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:lime2 w-full pr-12"
                  required
                />
              </div> */}
            {/* {data.password !== data.confirmPassword && (
                <div className="text-red mt-2">
                  Password and Confirm Password do not match.
                </div>
              )}
            </div> */}

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
                disabled
                name="email"
                value={data.email}
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
                disabled
                id="phoneNumber"
                name="phoneNumber"
                value={data.phoneNumber}
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
              Delete
            </button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }

export default DeleteUserModal;
