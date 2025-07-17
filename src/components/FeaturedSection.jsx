import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Title
          title="Featured Vehicle"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 w-full"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
            className="rounded-lg transition-all duration-300"
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Explore Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-100 rounded-md mt-16 cursor-pointer text-sm font-medium shadow-sm transition"
      >
        Explore all cars{" "}
        <img className="h-5 transition-transform group-hover:translate-x-1" src={assets.arrowIcon} alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default FeaturedSection;
