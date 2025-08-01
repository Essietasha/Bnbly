import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const rooms = [
  {
    name: "Cozy Cabin in Abuja",
    price: 45,
    image: "http://bit.ly/4oeioVg",
    rating: 4.9,
    guestFavorite: false,
  },
  {
    name: "Modern Loft in Lekki",
    price: 70,
    image: "https://bit.ly/4meE6GF",
    rating: 4.6,
    guestFavorite: false,
  },
  {
    name: "Beachside Bungalow in Ph",
    price: 80,
    image: "https://bit.ly/40IoTFF",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Room in Festac",
    price: 80,
    image: "https://bit.ly/4fohyRJ",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "2 Bedroom in Magodo",
    price: 80,
    image: "https://bit.ly/4mhMEg7",
    rating: 5.0,
    guestFavorite: false,
  },
];

export const seedRoomList = async () => {
    const roomCollection = collection(db, "roomList");

    for (const room of rooms) {
        await addDoc(roomCollection, room);
    }

    console.log("Rooms added");
}