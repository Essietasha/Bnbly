# Bnbly – Book Your Stay

## Overview
Bnbly is a modern full-stack travel and apartment booking platform that allows users to browse, filter, host, and reserve stays through a seamless interface. Built with React and Firebase, the platform simulates a booking workflow including authentication, reservation management, and a payment confirmation simulation.

## Tech Stack

### Frontend
React (Functional Components + Hooks)
React Router
Context API (State Management)
Tailwind CSS (Responsive UI)
JavaScript (ES6+)

### Backend & Database
Firebase Authentication
Firebase Firestore

### Core Features
Authentication & Authorization
User registration and login with Firebase Authentication
Secure session handling
Protected routes for authenticated users
Conditional UI rendering based on user status
Apartment Listing
Apartment Hosting
Apartment Filtering
Reservation Dashboard
Booking management
Payment Simulation

### Data Flow
User authenticates via Firebase
Listings are fetched from Firestore
User interactions update state via Context
User can become host and add apartment listings
Reservations and favorites are written to Firestore
Real-time listeners update UI dynamically

### What This Project Demonstrates
Building a booking systems workflow
Secure authentication with Firebase
Firestore real-time database integration
Protected route handling
Clean React component architecture
State-driven UI updates
Simulated transaction flow design
Responsive design implementation

### Future Improvements
Stripe or Paystack integration
Image upload optimization
Admin analytics dashboard
