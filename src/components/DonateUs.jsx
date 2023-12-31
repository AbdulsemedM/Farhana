import React from "react";
import Navbar from "../containers/Navbar";
// import { img } from "../constants";
import img from "../constants";
import Footer from "../containers/Footer";

const Card = ({ image, title, description }) => {
  return (
    <div className="max-w-lg sm:m-2 mx-auto bg-night shadow-md rounded-md overflow-hidden">
      <img src={image} alt="ban" className="w-ful object-cover p-2" />
      <div className="p-4">
        <h2 className="text-xl text-white font-semibold mb-2">{title}</h2>
        <p className="text-silver">{description}</p>
      </div>
    </div>
  );
};

const DonateUs = () => {
  const cards = [
    {
      image: "https://pbzbank.co.tz/image/001.jpg",
      title: "PBZ Islamic Bank",
      description:
        "Donate Us through our PBZ Islamic bank account Number 0839520001 in Tanzanian shilings",
    },
    {
      image: "https://pbzbank.co.tz/image/001.jpg",
      title: "PBZ Islamic Bank",
      description:
        "Donate Us through our PBZ Islamic bank account Number 0839520002 in USD",
    },
  ];
  return (
    <div>
      <div className="h-full w-full bg-midnight  relative">
        <img
          src={img.donate}
          alt=""
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="py-4" />
        <div className=" sticky top-0 z-50">
          <Navbar />
        </div>
        <div>
          <h1 className="text-silver lg:text-4xl md:3xl sm:xl p-24 text-center font-bold tracking-wide font-serif">
            Narrated Abu Bakr (may Allah be pleased with him): The Prophet
            (peace be upon him) said, "The one who sponsors an orphan, whether
            it is a relative of his or not, I and he will be like these two in
            Paradise," and he held his two fingers together to illustrate.
            (Bukhari)
          </h1>
        </div>
        <div className="place-content-center items-center justify-center flex-colomn ">
          {/* <h2 className="text-3xl text-white text-center font-semibold">
            Help Children and The Poor
          </h2> */}
          <div className="p-6" />

          <div className="flex justify-center items-center">
            <button className="text-2xl font-bold bg-gradient-to-r from-lime1 hover:from-hover hover:to-silver p-8 rounded-lg to-lime2 relative">
              Donate Us
            </button>
          </div>
          <div className="p-32" />
        </div>
      </div>
      <div className="h-full w-full bg-gradient-to-r from-midnight to-night  relative items-center justify-center">
        <div className="flex justify-center items-center">
          <img
            src={img.logo}
            alt="Logo"
            className="items-center justify-center"
            width={270}
          />
        </div>
        <div>
          <p className="text-4xl text-silver text-center font-serif font-semibold pb-3">
            Donate Us Through
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pb-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonateUs;
