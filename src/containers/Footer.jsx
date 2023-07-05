import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 h-full w-full bg-night relative items-center justify-center ">
      <div className="container mx-auto px-4 bg-night relative items-center justify-evenly">
        <div className="flex flex-wrap justify-evenly md:justify-between items-start">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white text-3xl font-semibold mb-4">Address</h3>
            <p className="text-white whitespace-nowrap text-xl">
              Mjini Magharibi - Unguja, Urban, Kilimani
            </p>
            <p className="text-white text-xl">Zanzibar</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white text-3xl font-semibold mb-4">
              Social Media
            </h3>
            <div className="flex">
              <Link className="text-hover mr-4 hover:text-lime">
                <FaFacebook size={32} />
              </Link>
              <Link className="text-hover mr-4 hover:text-lime">
                <FaTwitter size={32} />
              </Link>
              <Link className="text-hover mr-4 hover:text-lime">
                <FaInstagram size={32} />
              </Link>
              <Link className="text-hover mr-4 hover:text-lime">
                <FaLinkedin size={32} />
              </Link>
              <Link className="text-hover mr-4 hover:text-lime">
                <FaYoutube size={32} />
              </Link>
            </div>
            <div className=" text-hover items-start flex flex-col p-2">
              <div className="p-2" />
              <div className="border-0 text-hover border-transparent bg rounded-md hover-border-4 p-2">
                <i
                  className="envelope
              icon"
                >
                </i>
                  AbduMussema22@gmail.com
              </div>
              <div className="border-0 text-hover border-transparent bg  rounded-md hover-border-4 p-2">
                <i className="mobile alternate icon"></i>
                +2519-4651-4836
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-white text-3xl font-semibold mb-4">
              Additional Details
            </h3>
            <p className="text-white text-xl">Lorem ipsum dolor sit amet</p>
            <p className="text-white text-xl">consectetur adipiscing elit</p>
          </div>
        </div>
        <div className="text-xl text-center pt-8">
        <div className="border-0 text-hover border-transparent  rounded-md hover-border-4 p-2">
                Copyright 
                <i className="copyright icon"></i>
                All Rights Reserved 2023
              </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
