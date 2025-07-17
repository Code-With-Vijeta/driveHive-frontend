import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center gap-14 bg-light text-center"
    >
      {/* Static Heading (no animation) */}
      <h1 className="text-4xl md:text-5xl font-semibold mt-20 tracking-wide">
        Luxury cars on Rent
      </h1>

      {/* Tilted 3D animated form */}
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareColor="#f7f7f7"
      >
        <motion.form
          onSubmit={handleSearch}
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className=" gap-12 flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] border-2 border-transparent hover:border-primary transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
            <div className="flex flex-col items-start gap-2">
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              >
                <option value="">Pickup Location</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <p className="px-1 text-sm text-gray-500">
                {pickupLocation ? pickupLocation : "Please select location"}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="pickup-date">Pick-up Date</label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                id="pickup-date"
                min={new Date().toISOString().split("T")[0]}
                className="text-sm text-gray-500"
                required
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="return-date">Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                id="return-date"
                className="text-sm text-gray-500"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer shadow-md"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-300 w-4 h-4"
            />
            Search
          </motion.button>
        </motion.form>
      </Tilt>

      {/* Floating Animation applied to Car Image instead of Heading */}
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        transitionSpeed={300}
        glareEnable={false}
      >
        <motion.img
          src={assets.mainCar}
          alt="car"
          className="max-h-74"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </Tilt>
    </motion.div>
  );
};

export default Hero;
