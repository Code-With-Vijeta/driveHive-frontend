import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, axios, currency } = useAppContext();

  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localCar = cars?.find((car) => car._id === id);
    if (localCar) {
      setCar(localCar);
      setLoading(false);
    } else {
      const fetchCar = async () => {
        try {
          const { data } = await axios.get(`/api/user/car/${id}`);
          if (data.success) {
            setCar(data.car);
          } else {
            toast.error("Car not found");
          }
        } catch (error) {
          toast.error("Failed to fetch car");
        } finally {
          setLoading(false);
        }
      };
      fetchCar();
    }
  }, [cars, id]);

  useEffect(() => {
    if (
      pickupDate &&
      returnDate &&
      new Date(returnDate) <= new Date(pickupDate)
    ) {
      setReturnDate("");
    }
  }, [pickupDate]);

  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate)
      return toast.error("Select both dates");
    if (new Date(returnDate) <= new Date(pickupDate)) {
      return toast.error("Return date must be after pickup date");
    }
    if (!car?.isAvailable) {
      return toast.error("This car is currently unavailable for booking");
    }

    try {
      const { data } = await axios.post("/api/user/book-car", {
        carId: car._id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-booking");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;

  if (!car) {
    return (
      <div className="px-6 py-20 text-center text-gray-400 text-lg">
        Car not found or unavailable.
      </div>
    );
  }

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.pricePerDay;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={assets.arrowBack} alt="back" className="opacity-65 h-5" />
        Back to all cars
      </button>

      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
       className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Car Info */}
        <div className="lg:col-span-2">
          <motion.img initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{duration:0.5}}
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-150 object-cover rounded-xl mb-6 shadow-md"
          />

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5,delay:0.2}}
           className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-borderColor my-6" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.user_profile,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} className="h-5 mb-2" />
                  {text}
                </motion.div>
              ))}
            </div>

            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} className="h-4 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Booking Form */}
        <motion.form initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}}
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">
              per day
            </span>
          </p>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="border border-borderColor px-3 py-3 rounded-lg"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="border border-borderColor px-3 py-3 rounded-lg"
              min={pickupDate}
              required
            />
          </div>

          {totalDays > 0 && (
            <p className="text-md font-medium text-gray-700">
              {totalDays} day(s) × {currency}
              {car.pricePerDay} ={" "}
              <span className="text-primary font-semibold">
                {currency}
                {totalPrice}
              </span>
            </p>
          )}

          <button
            type="submit"
            disabled={!car.isAvailable}
            className={`w-full py-3 font-medium text-white rounded-xl cursor-pointer transition-all ${
              car.isAvailable
                ? "bg-primary hover:bg-primary-dull"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {car.isAvailable ? "Book Now" : "Unavailable"}
          </button>

          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CarDetails;
