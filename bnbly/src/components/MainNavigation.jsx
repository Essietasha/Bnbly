import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { HiHomeModern } from "react-icons/hi2";
import { FcHome } from "react-icons/fc";
import { FcAreaChart  } from "react-icons/fc";
import { FcSelfServiceKiosk  } from "react-icons/fc";

const MainNavigation = () => {
    
    const isActive = ({ isActive }) => isActive ? classes.active : undefined;

    return (
        <>
    <header>
        <nav className={classes.navFlex}>
            <div>
                <Link to="home" className={classes.logo} > 
                    <HiHomeModern />
                    <h5>bnbly</h5>
                </Link>
            </div>
            <div className={classes.links}>
                <ul>
                    <li>
                        <FcHome/> 
                        <NavLink to='home' className={isActive} end> Homes </NavLink>
                    </li>
                    <li>
                        <FcAreaChart />
                        <NavLink to='experiences' className={isActive}> Experiences </NavLink>
                    </li>
                    <li>
                        <FcSelfServiceKiosk />
                        <NavLink to='services' className={isActive}> Services </NavLink>
                    </li>
                </ul>
            </div>

            <div className={classes.moreLinks}>
                <ul>
                    <li>
                        <NavLink to='services'> Become a Host </NavLink>
                    </li>
                    <li>
                        <NavLink to='services'> Login or Sign up </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    </>
  )
}

export default MainNavigation;