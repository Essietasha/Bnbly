# Bnbly – Book Your Stay

## Overview
Bnbly is a modern full-stack travel and apartment booking platform that allows users to browse, filter, host, and reserve stays through a seamless interface. Built with React and Firebase, the platform simulates a booking workflow including authentication, reservation management, and a payment confirmation simulation.

### View

<p align="center">
	<img src="https://github.com/user-attachments/assets/84d6773f-f87b-40f3-824d-3692dd273439"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/565c37cd-bfdc-44ed-ad5e-2010740dd441"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/4c77e225-9834-4594-b58c-936aa8f24dc1"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/a821d064-cf2b-4753-975a-1e457b899580"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/9a041b8c-cbd7-48d1-8f9a-066a7b5c7669"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/c3dba9d7-556a-42c8-be19-2df029ee8c3b"  alt="View listings screenshot" width="80%">
</p>
<p align="center">
	<img src="https://github.com/user-attachments/assets/0e7c18c1-b79b-467f-85c6-7caf6f3e73e7"  alt="View listings screenshot" width="80%">
</p>


## Tech Stack
### Frontend
React, Firebase, JavaScript, Tailwind CSS

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
