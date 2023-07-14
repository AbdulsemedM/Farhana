import React from "react";
import img from "../../constants";
import "./print.css";

const DetailToPrint = ({ users, row, user, orphan, fromprint }) => {
  const currentDate = new Date();
  const date = currentDate;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (
    <div>
      {fromprint && (
        <div>
          <div className="flex mb-10 mx-10 items-center justify-between">
            <span className="mr-4">
              <img src={img.logo} width={150} alt="logo" />
            </span>
            <span className="flex flex-col">
              <span className="font-bold text-2xl text-cyan-500">
                {row?.firstName ? row?.firstName : row?.fullName} Details
              </span>
              <span className="text-lg">
                Date: {day}-{month}-{year}
              </span>
            </span>
          </div>
          <div className="ui divider"></div>
        </div>
      )}
      <div className="flex justify-around mb-3">
        {!users && (
          <div className="">
            <div className="font-bold text-2xl text-center">Information:</div>
            <img src={row?.image} alt="" width={400} height={400} />
          </div>
        )}
        {users && (
          <div className="">
            <div className="font-bold text-2xl text-center">
              Recieved Message:
            </div>
          </div>
        )}
        {/* <div className="font-bold text-2xl">Address:</div> */}
      </div>
      <div className="flex justify-around">
        <div className="flex justify-between">
          {!users && (
            <div className="flex flex-col mr-10">
              <span className="font-bold text-lg mb-2">First Name: </span>
              <span className="font-bold text-lg mb-2">Last Name: </span>

              <span className="font-bold text-lg mb-2">Age: </span>
              <span className="font-bold text-lg mb-2">Gender: </span>
              <span className="font-bold text-lg mb-2">Description: </span>
              <span className="font-bold text-lg mb-2">Registered at: </span>
            </div>
          )}
          {users && (
            <div className="flex flex-col mr-10">
              <span className="font-bold text-lg mb-2">Full Name: </span>
              <span className="font-bold text-lg mb-2">Email: </span>

              <span className="font-bold text-lg mb-2">Phone Number: </span>
              <span className="font-bold text-lg mb-2">Address: </span>
              <span className="font-bold text-lg mb-2">Message: </span>
              <span className="font-bold text-lg mb-2">Recieved at: </span>
            </div>
          )}
          {!users && (
            <div className="flex flex-col">
              <span className="text-lg mb-2">{row?.firstName}</span>
              <span className="text-lg mb-2">{row?.lastName}</span>
              {users && <span className="text-lg mb-2">{row?.fullName}</span>}

              <span className="text-lg mb-2">{row?.age}</span>
              <span className="text-lg mb-2">{row?.gender}</span>
              <span className="text-lg mb-2">{row?.description}</span>
              <span className="text-lg mb-2">{row?.createdAt}</span>
            </div>
          )}
          {users && (
            <div className="flex flex-col">
              <span className="text-lg mb-2">{row?.fullName}</span>
              <span className="text-lg mb-2">{row?.email}</span>
              {users && (
                <span className="text-lg mb-2">{row?.phoneNumber}</span>
              )}

              <span className="text-lg mb-2">{row?.address}</span>
              <span className="text-lg mb-2">{row?.message}</span>
              <span className="text-lg mb-2">
                {new Date(row?.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailToPrint;
