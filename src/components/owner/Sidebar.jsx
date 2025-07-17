import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const location = useLocation();
  const [image, setImage] = useState('');

  // ✅ Correct object destructuring from context
  const { user, axios, fetchUser } = useAppContext();

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      // ✅ Fixed incorrect syntax here
      const { data } = await axios.post('/api/owner/update-image', formData);

      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
      <div className='group relative'>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : user?.image || "https://images.pexels.com/photos/32904014/pexels-photo-32904014.jpeg"}
            alt="user"
            className='w-9 h-9 md:h-14 md:w-14 mx-auto rounded-full'
          />
          <input
            type="file"
            id='image'
            accept='image/*'
            hidden
            onChange={e => setImage(e.target.files[0])}
          />
          <div className='absolute hidden top-0 right-0 left-0 rounded-full bottom-0 bg-black/10 group-hover:flex items-center justify-center cursor-pointer'>
            <img className='h-5' src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className='flex items-center gap-1 mt-2 px-3 py-1 bg-primary/10 text-primary rounded text-xs absolute right-0 top-0'
        >
          Save
          <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
          >
            <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="icon" className='h-5' />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='bg-primary w-1.5 h-8 rounded-lg right-0 absolute'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
