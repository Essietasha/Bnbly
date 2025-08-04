import { useLoaderData } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";

const RoomDetailsPage = () => {
  const room = useLoaderData();

  return (
    <div className="px-8 py-2 max-w-7xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-6">{room.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-80 object-cover rounded-xl"
        />

        <div className="grid gap-2 sm:grid-cols-2">
          {room.moreImages.map((item, idx) => (
            <img src={item} alt={`${room.name} - ${idx + 1}`} key={idx} className="w-full h-40 object-cover rounded"/>
          ))}
        </div>
      </div>

      <div className="px-1"> 
        { room.thingsToKnow.maximumGuest } Guests • <span></span>
        { room.details.bedrooms } Bedrooms • <span></span>
        { room.details.beds } beds • <span></span>
        { room.details.baths } baths
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-gray-700">${room.price} for a night </p>
              <p className="text-yellow-600 font-semibold">★ {room.rating}</p>
            </div>
            <p className="text-gray-600 mb-1 mt-4">{room.description}</p>
          </div>

          <button className="bg-black text-white rounded-lg px-6 py-2 hover:bg-gray-800 w-fit self-start mt-2">
            Reserve
          </button>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-2xl font-semibold mb-2">Hosted by {room.host.name}</h3>
          <div>
            {room.host.isSuperhost && <h3 className="text-green-950 text-sm font-bold mb-1 flex items-center gap-2"> <span className="text-green-700"><IoIosCheckmarkCircle/></span> Super Host</h3>}
          </div>
          <p> {room.host.yearsOfHosting } years of hosting</p>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
          {room.amenities?.map((item, idx) => (
            <p className="flex items-center gap-2" key={idx}> <GiCheckMark/> {item}</p>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 py-6 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Things to know</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-semibold">Check-in:</span> {room.thingsToKnow?.checkIn}</li>
            <li><span className="font-semibold">Check-out:</span> {room.thingsToKnow?.checkOut}</li>
            <li><span className="font-semibold">Maximum Guest:</span> {room.thingsToKnow?.maximumGuest}</li>
            <li><span className="font-semibold">Cancellation policy:</span> {room.thingsToKnow?.cancellationPolicy}</li>
            <li><span className="font-semibold">Safety & Property:</span> {room.thingsToKnow?.safetyAndProperty}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Review scores</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            {room.reviewStats && Object.entries(room.reviewStats).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b pb-1">
                <span className="capitalize">{key}</span>
                <span>★ {value.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default RoomDetailsPage;










// import { useLoaderData } from "react-router-dom";
// import { GiCheckMark } from "react-icons/gi";
// import { IoIosCheckmarkCircle } from "react-icons/io";

// const RoomDetailsPage = () => {
//   const room = useLoaderData();

//   return (
//     <div className="p-8 max-w-7xl mx-auto space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <img
//           src={room.image}
//           alt={room.name}
//           className="w-full h-80 object-cover rounded-xl"
//         />

//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
//             <p className="text-lg text-gray-700 mb-1">${room.price} / night</p>
//             <p className="text-yellow-600 font-semibold mb-4">★ {room.rating}</p>
//             <p className="text-gray-600 mb-1 mt-4">{room.description}</p>
//           </div>

//           <button className="bg-black text-white rounded-lg px-6 py-2 hover:bg-gray-800 w-fit self-start mt-2">
//             Reserve
//           </button>
//         </div>
//       </div>
//       <div className="px-1"> 
//         { room.thingsToKnow.maximumGuest } Guests • <span></span>
//         { room.details.bedrooms } Bedrooms • <span></span>
//         { room.details.beds } beds • <span></span>
//         { room.details.baths } baths
//       </div>
//       <div className="border-t border-gray-300 pt-6">
//         <h3 className="text-2xl font-semibold mb-2">Hosted by {room.host.name}</h3>
//         <div>
//           {room.host.isSuperhost && <h3 className="text-green-950 text-sm font-bold mb-1 flex items-center gap-2"> <span className="text-green-700"><IoIosCheckmarkCircle/></span> Super Host</h3>}
//         </div>
//         <p> {room.host.yearsOfHosting } years of hosting</p>
//       </div>

//       <div className="border-t border-gray-300 pt-6">
//         <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
//           {room.amenities?.map((item, idx) => (
//             <p className="flex items-center gap-2" key={idx}> <GiCheckMark/> {item}</p>
//           ))}
//         </div>
//       </div>

//       {/* <div className="border-t border-gray-300 pt-6">
//         <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {room.reviews?.map((review) => (
//             <div key={review.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
//               <h4 className="font-bold text-sm mb-1">{review.name}</h4>
//               <p className="text-sm text-gray-700 mb-2">★ {review.rating}</p>
//               <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       <div className="border-t border-gray-300 py-6 grid md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Things to know</h2>
//           <ul className="text-sm text-gray-700 space-y-2">
//             <li><span className="font-semibold">Check-in:</span> {room.thingsToKnow?.checkIn}</li>
//             <li><span className="font-semibold">Check-out:</span> {room.thingsToKnow?.checkOut}</li>
//             <li><span className="font-semibold">Maximum Guest:</span> {room.thingsToKnow?.maximumGuest}</li>
//             <li><span className="font-semibold">Cancellation policy:</span> {room.thingsToKnow?.cancellationPolicy}</li>
//             <li><span className="font-semibold">Safety & Property:</span> {room.thingsToKnow?.safetyAndProperty}</li>
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Review scores</h2>
//           <ul className="text-sm text-gray-700 space-y-2">
//             {room.reviewStats && Object.entries(room.reviewStats).map(([key, value]) => (
//               <li key={key} className="flex justify-between border-b pb-1">
//                 <span className="capitalize">{key}</span>
//                 <span>★ {value.toFixed(1)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default RoomDetailsPage;
