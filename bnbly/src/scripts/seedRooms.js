import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

// Popular Homes In Lagos
const popularHomesInLagos = [
  {
    name: "Cozy Cabin in VGC",
    price: 450,
    image: "http://bit.ly/4fhYfcJ",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Modern Loft in Lekki",
    price: 270,
    image: "http://bit.ly/4oeioVg",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Beachside Bungalow in Ikoyi",
    price: 310,
    image: "https://bit.ly/40IoTFF",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "2 Bedroom in Magodo",
    price: 180,
    image: "https://bit.ly/4mhMEg7",
    rating: 4.7,
    guestFavorite: false,
  },
  {
    name: "Apartment in Ikeja",
    price: 150,
    image: "https://plus.unsplash.com/premium_photo-1675615949743-6ec930d87410?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fHJvb21zfGVufDB8fDB8fHww",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Mini Flat in Lakeview",
    price: 210,
    image: "https://images.unsplash.com/photo-1642703168632-5a711d91b043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHJvb21zfGVufDB8fDB8fHww",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 200,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDE4fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "3 bedroom in Maryland",
    price: 250,
    image: "https://images.unsplash.com/photo-1746549854237-1836d4c6d76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM2fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Mini Flat in Ajah",
    price: 180,
    image: "https://images.unsplash.com/photo-1630568238435-27b47667969b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
  },
  // {
  //   name: "Apartment in VI",
  //   price: 280,
  //   image: "https://plus.unsplash.com/premium_photo-1675615648367-a14fc002dded?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w2fHx8ZW58MHx8fHx8",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];


// Available Next Month Island
const availableNextMonthIsland = [
  {
    name: "Apartment in Lagos",
    price: 145,
    image: "http://bit.ly/46xF0ts",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Condo in Lagos",
    price: 105,
    image: "http://bit.ly/4lUjpQx",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 160,
    image: "https://bit.ly/3UEPv6S",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Room in Lagos",
    price: 55,
    image: "https://bit.ly/45tQYDk",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 140,
    image: "https://bit.ly/40MFJ6o",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 80,
    image: "https://images.unsplash.com/photo-1643297551340-19d8ad4f20ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXMlMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 99,
    image: "https://images.unsplash.com/photo-1646082144991-dc168f7bae03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc1fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 75,
    image: "https://images.unsplash.com/photo-1661258320748-6c3ec4641813?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU2fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    guestFavorite: false,
  },
  {
    name: "Apartment in Lagos",
    price: 100,
    image: "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
  },
  // {
  //   name: "Staycation in Lagos",
  //   price: 305,
  //   image: "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];


// Homes on Mainland
const homesOnTheMainland = [
  {
    name: "Apartment in Ikeja",
    price: 90,
    image: "http://bit.ly/4fhYfcJ",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Room in Maryland",
    price: 70,
    image: "http://bit.ly/4lanWNU",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment in Festac",
    price: 110,
    image: "https://bit.ly/3IYtnBU",
    rating: 4.5,
    guestFavorite: false,
  },
  {
    name: "Room in Gbagada",
    price: 120,
    image: "https://bit.ly/4lVorwa",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment in Ikeja GRA",
    price: 130,
    image: "https://bit.ly/4oi0yk4",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Mini Flat in Surulere",
    price: 100,
    image: "https://bit.ly/4fohyRJ",
    rating: 4.9,
    guestFavorite: false,
  },
    {
    name: "Apartment in Ikate",
    price: 90,
    image: "https://images.unsplash.com/photo-1659731062338-5a969a0b0c5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    guestFavorite: false,
  },
  {
    name: "Room in Ogudu",
    price: 115,
    image: "https://images.unsplash.com/photo-1541194577687-8c63bf9e7ee3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpdmluZyUyMHJvb20lMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment in Ikeja",
    price: 99,
    image: "https://plus.unsplash.com/premium_photo-1723901831135-782c98d8d8e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxpdmluZyUyMHJvb20lMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 4.9,
    guestFavorite: false,
  },
  // {
  //   name: "Apartment in Festac",
  //   price: 95,
  //   image: "https://images.unsplash.com/photo-1581791836186-7609d9ecfd38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGl2aW5nJTIwcm9vbSUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];


// Available Next Month Mainland
const availableNextMonthMainland = [
  {
    name: "Apartment on the Mainland",
    price: 99,
    image: "https://images.unsplash.com/photo-1581299894303-5a293523369b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 75,
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzM5fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 65,
    image: "https://plus.unsplash.com/premium_photo-1661963211494-558f6f7aa721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDI1fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 80,
    image: "https://images.unsplash.com/photo-1614870986943-9cdceb1ef5b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 85,
    image: "https://plus.unsplash.com/premium_photo-1676823553593-ac587b35a018?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDM3fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 90,
    image: "https://plus.unsplash.com/premium_photo-1674035036549-67b8ad6d0be3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY5fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    guestFavorite: false,
  },
    {
    name: "Apartment on the Mainland",
    price: 95,
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxpdmluZyUyMHJvb20lMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 85,
    image: "https://images.unsplash.com/photo-1616952391192-d8bc85de60d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxpdmluZyUyMHJvb20lMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Mainland",
    price: 99,
    image: "https://images.unsplash.com/photo-1607545484637-233cbb1c4169?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGl2aW5nJTIwcm9vbSUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  // {
  //   name: "Apartment on the Mainland",
  //   price: 100,
  //   image: "https://plus.unsplash.com/premium_photo-1706152482966-a295c922cdcf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbSUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];


// Homes On The Island
const homesOnTheIsland = [
  {
    name: "Apartment on the Island",
    price: 280,
    image: "https://bit.ly/459uaZH",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 325,
    image: "https://bit.ly/45b2JgB",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 300,
    image: "https://bit.ly/3HcKakh",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 245,
    image: "http://bit.ly/3IUVpyk",
    rating: 4.9,
    guestFavorite: false,
  },
    {
    name: "Apartment on the Island",
    price: 255,
    image: "https://bit.ly/3UG6Axn",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 260,
    image: "https://images.unsplash.com/photo-1498373419901-52eba931dc4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxob3VzZXMlMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 5.0,
    guestFavorite: false,
  },
    {
    name: "Apartment on the Island",
    price: 220,
    image: "https://plus.unsplash.com/premium_photo-1674676470323-4aa46ef69086?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHMlMjBvbiUyMGxhZ29zJTIwaXNsYW5kfGVufDB8fDB8fHww",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 315,
    image: "https://images.unsplash.com/photo-1633119712778-30d94755de54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50cyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Apartment on the Island",
    price: 275,
    image: "https://images.unsplash.com/photo-1630703104248-45342d591a60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
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
  },
  {
    name: "Apartment in Ikeja",
    price: 135,
    image: "https://images.unsplash.com/photo-1629042306553-206be379b254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Home in Ikeja",
    price: 100,
    image: "https://plus.unsplash.com/premium_photo-1676823552800-3f23a64b5f35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Condo in Ikeja",
    price: 320,
    image: "https://bit.ly/4meE6GF",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Home in Ikeja",
    price: 190,
    image: "https://images.unsplash.com/photo-1651804279611-a0b8b4bdb4f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Apartment in Ikeja",
    price: 80,
    image: "https://images.unsplash.com/photo-1669664863985-ac4a81e7483e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY0fHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 4.9,
    guestFavorite: false,
  },
    {
    name: "Apartment in Ikeja",
    price: 150,
    image: "https://plus.unsplash.com/premium_photo-1674676471837-259d368a1d6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  {
    name: "Apartment in Ikeja",
    price: 165,
    image: "https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Room in Ikeja",
    price: 100,
    image: "https://plus.unsplash.com/premium_photo-1676823552649-d3221b563566?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    guestFavorite: false,
  },
  // {
  //   name: "Home in Ikeja",
  //   price: 215,
  //   image: "https://images.unsplash.com/photo-1630703103236-f712db10e234?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJvb21zJTIwYXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  //   rating: 5.0,
  //   guestFavorite: false,
  // },
];

// Seed a Unit
// export const seedRoomList = async () => {
//     const roomCollection = collection(db, "roomList");
//     for (const room of rooms) {
//         await addDoc(roomCollection, room);
//     }
//     console.log("Rooms added");
// }


// Seed Multiple Units
// export const seedCollection = async (collectionName, data) => {
//     const collectionRef = collection(db, collectionName);
//     for (const item of data) {
//         try {
//           await addDoc(collectionRef, item);
//         }
//         catch (error) {
//           console.log(`Failed to add ${collectionName}!`, item, error);
//         }
//     }
//     console.log("Collections added");
// };


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
