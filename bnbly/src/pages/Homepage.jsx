import React, { useState, useEffect } from 'react';
import LinksNavigation from '../components/LinksNavigation';
import HomepageListing from '../components/HomepageListing';
import { NavLink, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/rooms/location/${location}`);
    }
  };

  return (
    <>    
      <div className="w-full flex justify-center sticky top-0 z-50 bg-transparent">
        <div className={`w-full max-w-4xl rounded-full shadow-md flex items-center bg-white transition-all duration-300 ${
            isScrolled ? "px-6 py-2 my-0" : "px-8 py-3 my-6"}`}>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex-1 flex items-center justify-start" >
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search destinations"
              className="w-full text-sm text-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-rose-500 text-white p-3 rounded-full ml-2 hover:bg-rose-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </button>
          </form>

          <div className="h-8 w-px bg-gray-300 mx-2" />
          <div>
            <NavLink to="/myfavorites" className="block px-4 py-2 cursor-pointer">Favorites</NavLink>
          </div>
        </div>
      </div>
      
      <HomepageListing />
      <LinksNavigation />
    </>
  );
};

export default HomePage;
