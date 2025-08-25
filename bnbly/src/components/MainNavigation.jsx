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
        <Link to="/" className="text-red-500 text-2xl font-bold hidden sm:block">
          bnbly
        </Link>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink to="/homes" className={navLinkStyle} end>Homes</NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={navLinkStyle} end>Apartments</NavLink>
          </li>
          <li>
            <NavLink to="/experiences" className={navLinkStyle}>Experiences</NavLink>
          </li>
            <li>
              <NavLink to="/becomehost" className={navLinkStyle}>Become a Host</NavLink>
            </li>
          { user ? 
            (<>
            <li>
              <NavLink to="/myfavorites" className={navLinkStyle}>Favorites</NavLink>
            </li>
            <li>
              <NavLink to="/createlisting" className={navLinkStyle}>Create Listing</NavLink>
            </li>
            <li>
              <NavLink to="/mylistings" className={navLinkStyle}>My Listings</NavLink>
            </li>
              <li>
                <button onClick={logout} className="text-red-500 cursor-pointer">Logout</button>
              </li>
              </>
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