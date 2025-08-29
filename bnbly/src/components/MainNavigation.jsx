import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcHome, FcAreaChart, FcSelfServiceKiosk } from "react-icons/fc";
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MainNavigation = () => {

  const { user, logout } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
                <NavLink to="/createlisting" className={navLinkStyle}>Add Listing</NavLink>
              </li>
              <li className="relative z-500">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hover:text-black transition" >
                  Activities
                </button>

                {isUserMenuOpen && (
                  <ul className="absolute mt-2 bg-white shadow-md rounded-md py-2 w-40 right-0">
                    <li>
                      <NavLink to="/mylistings" className="block px-4 py-2 hover:bg-gray-100">My Listings</NavLink>
                    </li>
                    <li>
                      <NavLink to="/myfavorites" className="block px-4 py-2 hover:bg-gray-100">Favorites</NavLink>
                    </li>
                    <li>
                      <NavLink to="/myreservations" className="block px-4 py-2 hover:bg-gray-100">My Reservations</NavLink>
                    </li>
                  </ul>
                )}
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