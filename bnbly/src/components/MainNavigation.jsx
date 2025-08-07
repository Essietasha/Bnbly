import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcHome, FcAreaChart, FcSelfServiceKiosk } from "react-icons/fc";

const MainNavigation = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-red-500 font-semibold border-b-2 border-red-500 pb-1" : "hover:text-black transition";

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
          <li className="flex items-center space-x-1">
            <FcAreaChart />
            <NavLink to="/experiences" className={navLinkStyle}>Experiences</NavLink>
          </li>
          <li className="flex items-center space-x-1">
            <FcSelfServiceKiosk />
            <NavLink to="/services" className={navLinkStyle}>Services</NavLink>
          </li>
        </ul>

        <ul className="hidden sm:flex space-x-4 text-gray-800 font-medium">
          <li>
            <NavLink to="/host" className="hover:text-black transition">Become a Host</NavLink>
          </li>
          <li>
            <NavLink to="/login" className="hover:text-black transition">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="hover:text-black transition">Sign up</NavLink>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default MainNavigation;


// import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import classes from './MainNavigation.module.css';
// import { HiHomeModern } from "react-icons/hi2";
// import { FcHome } from "react-icons/fc";
// import { FcAreaChart  } from "react-icons/fc";
// import { FcSelfServiceKiosk  } from "react-icons/fc";

// const MainNavigation = () => {
    
//     const isActive = ({ isActive }) => isActive ? classes.active : undefined;

//     return (
//         <>
//     <header>
//         <nav className={classes.navFlex}>
//             <div>
//                 <Link to="home" className={classes.logo} > 
//                     <HiHomeModern />
//                     <h5>bnbly</h5>
//                 </Link>
//             </div>
//             <div className={classes.links}>
//                 <ul>
//                     <li>
//                         <FcHome/> 
//                         <NavLink to='home' className={isActive} end> Homes </NavLink>
//                     </li>
//                     <li>
//                         <FcAreaChart />
//                         <NavLink to='experiences' className={isActive}> Experiences </NavLink>
//                     </li>
//                     <li>
//                         <FcSelfServiceKiosk />
//                         <NavLink to='services' className={isActive}> Services </NavLink>
//                     </li>
//                 </ul>
//             </div>

//             <div className={classes.moreLinks}>
//                 <ul>
//                     <li>
//                         <NavLink to='services'> Become a Host </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to='services'> Login or Sign up </NavLink>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     </header>
//     </>
//   )
// }

// export default MainNavigation;