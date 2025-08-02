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
    price: 120,
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
    rating: 4.5,
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
    price: 260,
    image: "https://bit.ly/3UG6Axn",
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
    price: 260,
    image: "https://images.unsplash.com/photo-1498373419901-52eba931dc4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxob3VzZXMlMjBpbiUyMGxhZ29zfGVufDB8fDB8fHww",
    rating: 5.0,
    guestFavorite: false,
  },
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
    image: "https://images.unsplash.com/photo-1661258464589-747d9cb1318d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYyfHxyb29tcyUyMGluJTIwbGFnb3N8ZW58MHx8MHx8fDA%3D",
    rating: 5.0,
    guestFavorite: false,
  },
  {
    name: "Home in Ikeja",
    price: 100,
    image: "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHJvb21zJTIwaW4lMjBsYWdvc3xlbnwwfHwwfHx8MA%3D%3D",
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
