import React, { useEffect } from 'react';
import NavbarOwner from '../../components/owner/NavbarOwner';
import Sidebar from '../../components/owner/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { isOwner } = useAppContext();
  const navigate = useNavigate(); // ✅ Create navigate instance

  useEffect(() => {
    if (!isOwner) {
      navigate('/'); // ✅ Redirect if not owner
    }
  }, [isOwner]);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-4 md:p-6 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
