import { useLoaderData } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import LinksNavigation from "../components/LinksNavigation";

const RoomDetailsPage = () => {
  const room = useLoaderData();

  return (
    <>
    <div className="px-8 py-2 max-w-7xl mx-auto space-y-4">
      <h1 className="text-3xl font-semibold mb-6">{room.name}</h1>

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
            
            <div className="flex items-center gap-4 px-1">
              <p className="text-gray-700">${room.price} for a night </p>
              <p className="text-yellow-600 font-semibold">★ {room.rating}</p>
              <div>
                {room.topTen && <div className="flex items-center gap-1"> <BsFillTrophyFill className="text-green-950 font-semibold text-[1rem]" /> <span>top 10</span> </div> }
              </div>
            </div>

            {room.topTen && room.rating === 5.0 &&
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl text-sm mt-4 mb-2">
                <div className="flex items-center gap-1">
                  <span>🌿</span>
                  <span className="font-semibold">Guest favorite</span>
                  <span className="ml-0 md:-ml-8">🌿</span>
                </div>
                <div className="text-gray-700"> One of the most loved homes on Bnbly, according to guests </div>
                <div className="flex items-center gap-4 ml-auto">
                  <div className="text-center">
                    <div className="font-semibold">5.0</div>
                    <div className="text-black">★★★★★</div>
                  </div>
                </div>
              </div>
            }
            <h1 className="text-2xl mt-6 font-medium">About this place</h1>
            <p className="mb-1 mt-2">{room.description}</p>
          </div>

          <button className="bg-black text-white rounded-lg px-6 py-2 hover:bg-gray-800 w-fit self-start mt-2">
            Reserve
          </button>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-2xl font-medium mb-2">Hosted by {room.host.name}</h3>
          <div>
            {room.host.isSuperhost && <h3 className="text-green-950 text-sm font-bold mb-1 flex items-center gap-2"> <span className="text-green-700"><IoIosCheckmarkCircle/></span> Super Host</h3>}
          </div>
          <p> {room.host.yearsOfHosting } years of hosting</p>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8 mb-8">
        <h3 className="text-xl font-medium mb-4">What this place offers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
          {room.amenities?.map((item, idx) => (
            <p className="flex items-center gap-2" key={idx}> <GiCheckMark/> {item}</p>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-10 text-center m-16">
        <div className="flex items-center justify-center gap-6 mb-4">
          <FaLeaf className="text-4xl text-yellow-500 rotate-[30deg]" />
          <span className="text-7xl font-semibold">{room.rating.toFixed(2)}</span>
          <FaLeaf className="text-4xl text-yellow-500 -scale-x-100 rotate-[-30deg]" />
        </div>
        <h3 className="text-lg font-medium">Guest favorite</h3>
        <p className="text-sm text-gray-600 mt-1">
          This home is a guest favorite based on <br />
          ratings, reviews, and reliability
        </p>
      </div>

      <div className="border-t border-gray-300 py-8 grid md:grid-cols-2 gap-8 mb-4">
        <div>
          <h2 className="text-2xl font-medium mb-4">Things to know</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li><span className="font-semibold">Check-in:</span> {room.thingsToKnow?.checkIn}</li>
            <li><span className="font-semibold">Check-out:</span> {room.thingsToKnow?.checkOut}</li>
            <li><span className="font-semibold">Maximum Guest:</span> {room.thingsToKnow?.maximumGuest}</li>
            <li><span className="font-semibold">Cancellation policy:</span> {room.thingsToKnow?.cancellationPolicy}</li>
            <li><span className="font-semibold">Safety & Property:</span> {room.thingsToKnow?.safetyAndProperty}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium mb-4">Review scores</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            {room.reviewStats && Object.entries(room.reviewStats).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b pb-1">
                <span className="capitalize">{key}</span>
                <span>★ {value.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-10 p-6 md:p-10 bg-white rounded-xl shadow-md my-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative">
            <h1 className="text-2xl font-medium mb-4">Meet your Host</h1>
            <img src={room.host.hostImage} alt={room.host.name} className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover" />
            {room.host.isSuperhost && (
              <div className="absolute bottom-2 right-10 bg-pink-600 text-white rounded-full p-1 text-xs"> ✔ </div>
            )}
          </div>
          
          <h2 className="text-2xl font-medium mt-4">{room.host.name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span>🏅</span> Superhost
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">{room.host.reviews}</span>
              <span className="text-gray-500">Reviews</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">{room.host.rating}★</span>
              <span className="text-gray-500">Rating</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium mr-1">{room.host.yearsOfHosting}</span>
              <span className="text-gray-500">Years hosting</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-medium">{room.host.name} is a Superhost</h3>
            <p className="text-gray-600 mt-1">
              Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium">Host details</h4>
            <p className="text-gray-600 mt-1">Response rate: {room.host.responseRate}%</p>
            {room.host.responseHour > 1 ? 
              <p className="text-gray-600">Responds within {room.host.responseHour} hours</p> 
              : <p className="text-gray-600">Responds within {room.host.responseHour} hour</p> 
            }
          </div>

          <button className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md font-medium cursor-pointer">
            <a href="//wa.me/+2347018454916" target="blank">Message host</a>
          </button>

          <div className="text-sm text-gray-600 border-t pt-4">
            To protect your payment, always use Bnbly to send money and communicate with hosts.
          </div>
        </div>
      </div>
    </div>

    <LinksNavigation />
    </>
  );
};

export default RoomDetailsPage;