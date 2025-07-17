import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageCars = () => {
  const { isOwner,axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all cars
  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle availability
const toggleCarAvailability = async (carId) => {
  try {
    const { data } = await axios.put('/api/owner/update-car-status', { carId });
    if (data.success) {
      toast.success(data.message); 
      fetchOwnerCars();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // ✅ Delete car
  const deleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const { data } = await axios.delete(`/api/owner/delete-car/${carId}`);
      if (data.success) {
        toast.success("Car deleted successfully");
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting car");
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className='w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        {loading ? (
          <div className="p-6 text-center text-gray-400">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No cars listed yet.</div>
        ) : (
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
            <thead className='text-gray-500 bg-gray-50'>
              <tr>
                <th className='p-3 font-medium'>Car</th>
                <th className='p-3 font-medium max-md:hidden'>Category</th>
                <th className='p-3 font-medium'>Price</th>
                <th className='p-3 font-medium max-md:hidden'>Status</th>
                <th className='p-3 font-medium'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className='border-t border-borderColor'>
                  <td className='p-3 flex items-center gap-3'>
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className='h-12 w-12 aspect-square rounded-md object-cover'
                    />
                    <div className='max-md:hidden'>
                      <p className='font-medium'>{car.brand} {car.model}</p>
                      <p className='text-gray-500'>{car.seating_capacity} seats • {car.transmission}</p>
                    </div>
                  </td>

                  <td className='p-3 max-md:hidden'>{car.category}</td>
                  <td className='p-3'>{currency}{car.pricePerDay}/day</td>

                  <td className='p-3 max-md:hidden'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      car.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                    }`}>
                      {car.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>

                  <td className='p-3'>
                    <div className='flex items-center gap-6 pt-2'>
                      <img
                        src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                        className='cursor-pointer h-5'
                        title={car.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                        onClick={() => toggleCarAvailability(car._id)}
                        alt="Toggle Availability"
                      />
                      <img
                        src={assets.delete_icon}
                        className='cursor-pointer h-5'
                        title="Delete Car"
                        onClick={() => deleteCar(car._id)}
                        alt="Delete Car"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
