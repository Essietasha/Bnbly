import React from 'react';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const RootLayout = () => {

  return (
    <>
    <ScrollToTop/>
    <MainNavigation />
    <main>
      <Outlet/>
    </main>
    <Footer />
    </>
  )
}

export default RootLayout;