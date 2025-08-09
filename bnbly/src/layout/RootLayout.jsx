import React from 'react';
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { AuthProvider } from '../context/AuthContext';

const RootLayout = () => {

  return (
    <>
    <AuthProvider>
      <ScrollToTop/>
      <MainNavigation />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default RootLayout;