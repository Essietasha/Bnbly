import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

// Popular Homes In Lagos
const popularHomesInLagos = [
  {
    name: "Cozy Cabin in VGC",
    price: 450,
    image: "http://bit.ly/4fhYfcJ",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    topTen: true,
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "http://bit.ly/4fhYfcJ",
      "https://images.unsplash.com/photo-1754071257688-c1d1c7e809c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1754071257688-c1d1c7e809c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
      "http://bit.ly/4fhYfcJ",
    ],
  },
  {
    name: "Modern Loft in Lekki",
    price: 270,
    image: "http://bit.ly/4oeioVg",
    rating: 4.8,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    topTen: true,
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
];



// Homes on Mainland
const homesOnTheMainland = [
  {
    name: "Apartment in Ikeja",
    price: 90,
    image: "http://bit.ly/4fhYfcJ",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    topTen: false,
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  {
    name: "Room in Maryland",
    price: 70,
    image: "http://bit.ly/4lanWNU",
    rating: 4.8,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    topTen: true,
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
];


// Homes On The Island
const homesOnTheIsland = [
  {
    name: "Apartment on the Island",
    price: 280,
    image: "https://bit.ly/459uaZH",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  {
    name: "Apartment on the Island",
    price: 325,
    image: "https://bit.ly/45b2JgB",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  // {
  //   name: "Apartment on the Island",
  //   price: 330,
  //   image: "https://images.unsplash.com/photo-1627484819540-40a871c972ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];


// Stay in Ikeja
const stayInIkeja = [
  {
    name: "Apartment in Ikeja",
    price: 125,
    image: "https://images.unsplash.com/photo-1580628646348-dbb9dfb2728f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  {
    name: "Apartment in Ikeja",
    price: 135,
    image: "https://images.unsplash.com/photo-1629042306553-206be379b254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
];
const availableNextMonthMainland = [
  {
    name: "Apartment in Ikeja",
    price: 125,
    image: "https://images.unsplash.com/photo-1580628646348-dbb9dfb2728f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  {
    name: "Apartment in Ikeja",
    price: 135,
    image: "https://images.unsplash.com/photo-1629042306553-206be379b254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
];

const availableNextMonthIsland = [
  {
    name: "Apartment in Ikeja",
    price: 125,
    image: "https://images.unsplash.com/photo-1580628646348-dbb9dfb2728f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
  {
    name: "Apartment in Ikeja",
    price: 135,
    image: "https://images.unsplash.com/photo-1629042306553-206be379b254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
    description: "This luxurious cabin in VGC offers a stylish, modern retreat. Located on the Island Road, it provides a peaceful escape amidst the city's energy. The beautifully furnished living area is designed for relaxation, offering a taste of sophisticated urban living. Onsite support staff are available during specified hours for assistance.",
    topTen: true,
    amenities: ["Air conditioning", "Gym", "Washer", "Kitchen", "TV", "Workspace", "Heating", "Coffee maker", "Free parking", "Pool", "Parking space"],
    details: {
      bedrooms: 3,
      beds: 3,
      baths: 2.5,
    },
    location: {
      street: "22 Island Road",
      neighborhood: "VGC",
      city: "Lagos",
    },
    host: {
      name: "Kally",
      profileImage: "",
      isSuperhost: true,
      yearsOfHosting: 3,
      rating: 4.85,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      reviews: 385,
      responseRate: 100,
      responseHour: 1,
      hostImage: "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      contact: {
        email: "kally@bnbly.com",
        phone: "+23477888888"
      }
    },
    bookingInfo: {
      pricePerNight: 450,
      cleaningFee: 25,
      serviceFee: 30,
    },
    reviewStats: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 4.9,
      location: 4.9,
      checkIn: 4.9,
      value: 5.0
    },
    thingsToKnow: {
      checkIn: "12:00 PM - 11 AM",
      checkOut: "11:00 AM",
      maximumGuest: 4,
      cancellationPolicy: "Free cancellation within 48 hours and Full refund up to 5 days before check-in.",
      safetyAndProperty: "Full security",
    },
    rules: {
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      quietHours: "10 PM - 7 AM"
    },
    moreImages: [
      "https://image1.jpg", "https://image2.jpg", "https://image3.jpg"
    ],
  },
];

// Seed Multiple Units with IDs
const generateDocId = (str) => {
  return str.toLowerCase();
}

export const seedCollection = async (collectionName, data) => {
    const collectionRef = collection(db, collectionName);

    let i = 1;

    for (const item of data) {
      const docId = generateDocId(`${collectionName}-${i}`);
      const docRef = doc(collectionRef, docId)

        try {
          await setDoc(docRef, item);
        }
        catch (error) {
          console.log(`Failed to add ${collectionName}!`, item, error);
        }

        i++;
    }
    console.log(`${collectionName} Added`);
};

export const seedAll = async () => {
  await seedCollection("popularHomesInLagos", popularHomesInLagos);
  await seedCollection("availableNextMonthIsland", availableNextMonthIsland);
  await seedCollection("homesOnTheMainland", homesOnTheMainland);
  await seedCollection("availableNextMonthMainland", availableNextMonthMainland);
  await seedCollection("homesOnTheIsland", homesOnTheIsland);
  await seedCollection("stayInIkeja", stayInIkeja);

  console.log("All collections seeded successfully");
};
