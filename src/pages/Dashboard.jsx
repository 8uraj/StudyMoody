import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Profile from '../components/Dashboard/Profile';
import EnrolledCourses from '../components/Dashboard/EnrolledCourses';
import Settings from '../components/Dashboard/Settings';
import Cart from '../components/Dashboard/Cart';
export default function Dashboard() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] my-8">
      <div className="lg:min-w-[200px] min-w-[170px] hidden md:block ">
        <Sidebar />
        
      </div>
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full mt-4">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
