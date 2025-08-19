import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcHome, FcAreaChart, FcSelfServiceKiosk } from "react-icons/fc";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MainNavigation = () => {

  const { user, logout } = useContext(AuthContext);

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-black font-semibold border-b-2 border-black-500" : "hover:text-black transition";

  return (
    <header className="shadow-md bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        
        <Link to="/" className="text-red-500 text-xl font-bold hidden sm:block">
          bnbly
        </Link>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="flex items-center space-x-1">
            <FcHome />
            <NavLink to="/homes" className={navLinkStyle} end>Homes</NavLink>
          </li>
          <li>
            <NavLink to="/apartments" className={navLinkStyle} end>Apartments</NavLink>
          </li>
          <li className="flex items-center space-x-1">
            <FcAreaChart />
            <NavLink to="/experiences" className={navLinkStyle}>Experiences</NavLink>
          </li>
          <li className="flex items-center space-x-1">
            <FcSelfServiceKiosk />
            <NavLink to="/myfavorites" className={navLinkStyle}>My List</NavLink>
          </li>
        </ul>

        <ul className="hidden sm:flex space-x-4 text-gray-800 font-medium">
          <li>
            <NavLink to="/becomehost" className="hover:text-black transition">Become a Host</NavLink>
          </li>
          <li>
            <NavLink to="/createlisting" className={navLinkStyle}>Create Listing</NavLink>
          </li>
        { user ? 
          (
            <li>
              <button onClick={logout} className="text-red-500 px-4 cursor-pointer">Logout</button>
            </li>
          ) : 
          (
            <li>
              <NavLink to="/login" className="hover:text-black transition">Login or Sign up</NavLink>
            </li>
          )
        }
        </ul>

      </nav>
    </header>
  );
};

export default MainNavigation;