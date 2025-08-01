import React from 'react';
import MainNavigation from '../components/MainNavigation';
import { Outlet } from 'react-router-dom';


const RootLayout = () => {

  return (
    <>
    <MainNavigation />
    <Outlet />
    </>
  )
}

export default RootLayout;