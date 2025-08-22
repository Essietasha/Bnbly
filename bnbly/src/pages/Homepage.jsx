import React, { useState, useEffect } from 'react';
import LinksNavigation from '../components/LinksNavigation';
import HomepageListing from '../components/HomepageListing';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>    
      <div className="w-full flex justify-center sticky top-0 z-50 bg-transparent">
        <div className={`w-full max-w-4xl rounded-full shadow-md flex items-center bg-white transition-all duration-300 ${
            isScrolled ? "px-6 py-2 my-0" : "px-8 py-3 my-6"}`}>

          <div className="flex-1">
            <div className="text-sm font-semibold">Where</div>
            <div className="text-gray-500 text-sm">Search destinations</div>
          </div>

          <div className="h-8 w-px bg-gray-300 mx-2" />

          <div className="flex-1">
            <div className="text-sm font-semibold">Check in</div>
            <div className="text-gray-500 text-sm">Add dates</div>
          </div>

          <div className="h-8 w-px bg-gray-300 mx-2" />

          <div className="flex-1">
            <div className="text-sm font-semibold">Check out</div>
            <div className="text-gray-500 text-sm">Add dates</div>
          </div>

          <div className="h-8 w-px bg-gray-300 mx-2" />

          <div className="flex-1">
            <div className="text-sm font-semibold">Who</div>
            <div className="text-gray-500 text-sm">Add guests</div>
          </div>

          <button
            className="bg-rose-500 text-white p-3 rounded-full ml-2 hover:bg-rose-600 transition"
            type="submit"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <HomepageListing />
      <LinksNavigation />
    </>
  );
};

export default HomePage;


// import React, { useState, useEffect, useContext } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import RoomCard from "../components/RoomCard";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";

// const HomepageRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);
//   const [favIds, setFavIds] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "apartments"));
//         const data = querySnapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds); // latest first
//         setRooms(data);
//       } catch (error) {
//         console.error("Error fetching apartments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRooms();
//   }, []);

//   // Fetch user favorites
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!user) {
//         setFavIds([]);
//         return;
//       }
//       const favRef = collection(db, "users", user.uid, "favorites");
//       const favSnap = await getDocs(favRef);
//       setFavIds(favSnap.docs.map((doc) => doc.id));
//     };
//     fetchFavorites();
//   }, [user]);

//   const updateFavState = (roomId, isAdding) => {
//     setFavIds((prev) => (isAdding ? [...prev, roomId] : prev.filter((id) => id !== roomId)));
//   };

//   // Group rooms by location
//   const groupedRooms = rooms.reduce((acc, room) => {
//     const loc = room.location || "Unknown";
//     if (!acc[loc]) acc[loc] = [];
//     acc[loc].push(room);
//     return acc;
//   }, {});

//   // Pick top 6 locations (latest or most populated)
//   const topLocations = Object.entries(groupedRooms)
//     .sort((a, b) => b[1].length - a[1].length) // optional: sort by number of rooms
//     .slice(0, 6);

//   return (
//     <div className="space-y-12 px-4 sm:px-6 lg:px-8">
//       {loading ? (
//         Array.from({ length: 6 }).map((_, idx) => (
//           <div key={idx}>
//             <h2 className="font-semibold text-xl mb-3 bg-gray-200 h-6 w-32 rounded animate-pulse"></h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//               {Array.from({ length: 6 }).map((__, i) => (
//                 <div key={i} className="bg-gray-200 h-60 rounded-xl animate-pulse"></div>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         topLocations.map(([location, locationRooms]) => (
//           <div key={location}>
//             <div className="flex justify-between items-center mb-4 px-2">
//               <h2 className="font-semibold text-xl">{`Rooms in ${location}`}</h2>
//               <Link
//                 to={`/rooms/apartments?location=${location}`}
//                 className="text-black text-sm flex items-center hover:underline"
//               >
//                 View All <FaArrowRight className="ml-1" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//               {locationRooms.slice(0, 6).map((room) => (
//                 <RoomCard
//                   key={room.id}
//                   room={room}
//                   collectionName="apartments"
//                   isFav={favIds.includes(room.id)}
//                   onFavChange={updateFavState}
//                 />
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HomepageRooms;
