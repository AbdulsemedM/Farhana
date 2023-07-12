import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlLogout, SlSettings } from "react-icons/sl";
import { AiOutlineAppstore, AiOutlineUserAdd } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import img from "../../../constants";
import { FaChild, FaListUl, FaUsers } from "react-icons/fa";
import { connect } from "react-redux";
import {
  setRole,
  setToken,
  setUserProfile,
} from "../../../redux/user/userAction";

const Sidebar = ({ setRole, setProfile, setAccessToken }) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  // const handleLogout = () => {
  //   // Add your logout logic here
  //   // For example, dispatch an action to clear user authentication or remove tokens
  //   console.log("Logout clicked");
  //   dispatch(setAccessToken(""));
  //   dispatch(setRole(""));
  //   setUserProfile({});
  // };

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(
    () => {
      isTabletMid && setOpen(false);
    },
    // eslint-disable-next-line
    [pathname]
  );

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "Settings",
      icon: SlSettings,
      menus: ["change password", "privacy", "policy", "security"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-midnight text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img src={img.logo} width={70} alt="" />
          <span className="text-xl text-white whitespace-pre">FCO</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-lime2   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"dashboard"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"registerOrphan"} className="link">
                <FaChild size={23} className="min-w-max" />
                Register New Orphan
              </NavLink>
            </li>
            <li>
              <NavLink to={"orphanList"} className="link">
                <FaListUl size={23} className="min-w-max" />
                List of Orphans
              </NavLink>
            </li>
            <li>
              <NavLink to={"users"} className="link">
                <AiOutlineUserAdd size={23} className="min-w-max" />
                Add User
              </NavLink>
            </li>
            <li>
              <NavLink to={"userList"} className="link">
                <FaUsers size={23} className="min-w-max" />
                List of Users
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-white inline-block mb-2">
                  Additional
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink
                to={"/login"}
                className="link"
                onClick={() => {
                  setAccessToken("");
                  setRole("");
                  setProfile({});
                }}
              >
                <SlLogout size={23} className="min-w-max" />
                Logout
              </NavLink>
            </li>
          </ul>
          {/* {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )} */}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden text-white right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden text-white " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setAccessToken: (item) => dispatch(setToken(item)),
  setProfile: (item) => dispatch(setUserProfile(item)),
  setRole: (item) => dispatch(setRole(item)),
});

export default connect(null, mapDispatchToProps)(Sidebar);
