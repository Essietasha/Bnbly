import React, { useState, useEffect } from 'react';
import RoomList from '../components/RoomList';
import ManageDataButton from '../components/ManageDataButton';
import LinksNavigation from '../components/LinksNavigation';

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

      <RoomList title="Popular Homes in Lagos" collectionName="popularHomesInLagos" />
      <RoomList title="Available next month on the Island" collectionName="availableNextMonthIsland" />
      <RoomList title="Homes on the Mainland" collectionName="homesOnTheMainland" />
      <RoomList title="Available next month on the Mainland" collectionName="availableNextMonthMainland" />
      <RoomList title="Homes on the Island" collectionName="homesOnTheIsland" />
      <RoomList title="Stay in Ikeja" collectionName="stayInIkeja" />

      <LinksNavigation />
    </>
  );
};

export default HomePage;


// import React from 'react';
// import RoomList from '../components/RoomList';
// import ManageDataButton from '../components/ManageDataButton';
// import LinksNavigation from '../components/LinksNavigation';

// const HomePage = () => {

//   return (
//     <>    
//     <ManageDataButton />
//     <div className="w-full flex justify-center py-6 px-4">
//       <div className="w-full max-w-4xl rounded-full shadow-md px-8 py-3 flex items-center bg-white">
        
//         <div className="flex-1">
//           <div className="text-sm font-semibold">Where</div>
//           <div className="text-gray-500 text-sm">Search destinations</div>
//         </div>

//         <div className="h-8 w-px bg-gray-300 mx-2" />

//         <div className="flex-1">
//           <div className="text-sm font-semibold">Check in</div>
//           <div className="text-gray-500 text-sm">Add dates</div>
//         </div>

//         <div className="h-8 w-px bg-gray-300 mx-2" />

//         <div className="flex-1">
//           <div className="text-sm font-semibold">Check out</div>
//           <div className="text-gray-500 text-sm">Add dates</div>
//         </div>

//         <div className="h-8 w-px bg-gray-300 mx-2" />

//         <div className="flex-1">
//           <div className="text-sm font-semibold">Who</div>
//           <div className="text-gray-500 text-sm">Add guests</div>
//         </div>

//         <button className="bg-rose-500 text-white p-3 rounded-full ml-2" type='submit'>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
//             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round"
//               d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
//           </svg>
//         </button>

//       </div>
//     </div>

//       <RoomList title="Popular Homes in Lagos" collectionName="popularHomesInLagos" />
//       <RoomList title="Available next month on the Island" collectionName="availableNextMonthIsland" />
//       <RoomList title="Homes on the Mainland" collectionName="homesOnTheMainland" />
//       <RoomList title="Available next month on the Mainland" collectionName="availableNextMonthMainland" />
//       <RoomList title="Homes on the Island" collectionName="homesOnTheIsland" />
//       <RoomList title="Stay in Ikeja" collectionName="stayInIkeja" />

//       <LinksNavigation />
//     </>
//   );
// };

// export default HomePage;