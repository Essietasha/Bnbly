import { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc, getDoc, deleteDoc, collection, serverTimestamp, getDocs, query, where, } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { GiCheckMark } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaLeaf, FaHeart } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import LinksNavigation from "../components/LinksNavigation";


const RoomDetailsPage = () => {
    const room = useLoaderData();
    const { user } = useContext(AuthContext);
    const [host, setHost] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
      if (!room?.hostId) return;
      const fetchHost = async () => {
        const hostRef = doc(db, "hosts", room.hostId);
        const hostSnap = await getDoc(hostRef);
        if (hostSnap.exists()) {
          setHost(hostSnap.data());
        } else {
          setHost({
            name: "Unknown Host",
            isSuperhost: false,
            reviews: 0,
            rating: 0,
            yearsOfHosting: 0,
            responseRate: 0,
            responseHour: 0,
            hostImage: "",
          });
        }
      };
      fetchHost();
    }, [room.hostId]);


    useEffect(() => {
        if (!user) {
          setIsFav(false);
          return;
        }
        const checkFavorite = async () => {
          const favRef = doc(db, "users", user.uid, "favorites", room.id);
          const favSnap = await getDoc(favRef);
          setIsFav(favSnap.exists());
        };
        checkFavorite();
    }, [user, room?.id]);


    const toggleFavorite = async () => {
        if (!user) {
          navigate("/login");
          return;
        }
        const favRef = doc(db, "users", user.uid, "favorites", room.id);
        if (isFav) {
          await deleteDoc(favRef);
          setIsFav(false);
        } else {
          await setDoc(favRef, {
            name: room.name,
            price: room.price,
            image: room.image,
            rating: room.rating,
            topTen: room.topTen || false,
          });
          setIsFav(true);
        }
    };

    const handleReserve = async () => {
      console.log("Reserve clicked", { user, roomId: room?.id, startDate, endDate });
        if (!user) {
          alert("Please login to reserve a room.");
          return;
        };

        const q = query(
          collection(db, "reservations"),
          where("roomId", "==", room.id),
          where("userId", "==", user.uid),
          where("status", "in", ["pending", "confirmed"])
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // If already has a pending or confirmed reservation
          alert("You already reserved this room.");
          return;
        };

        if (!startDate || !endDate) {
          alert("Please select check-in and check-out dates.");
          return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
          alert("Check-out must be after check-in.");
          return;
        }

        try {
          const reservationRef = doc(collection(db, "reservations"));
          await setDoc(reservationRef, {
            userId: user.uid,
            roomId: room.id,
            startDate,
            endDate,
            status: "pending",
            createdAt: serverTimestamp(),
          });

          // Redirect to payment page with reservationId
          navigate(`/payment/${reservationRef.id}`);
        } catch (error) {
          console.error("Error reserving room:", error);
          console.log("Reserving", { user: user.uid, roomId: room?.id, startDate, endDate });
          alert("Something went wrong. Try again.");
        }
    };
  
    if (!room) return <p className="text-center mt-10">Loading room details...</p>;
    if (!host) return <p className="text-center mt-10">Loading host details...</p>;

  return (
    <>
    <div className="px-8 py-2 max-w-7xl mx-auto space-y-4 mt-4">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-3xl font-semibold">{room.name}</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleFavorite} className="text-red-500">
            <FaHeart fill={isFav ? "red" : "grey"} size={22} />
          </button>
          <Link to="/myfavorites" className="underline">
            My Favorites
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={room.image}
          alt={room.name}
          className="w-full aspect-video object-cover rounded-xl"
        />

        <div className="grid gap-2 sm:grid-cols-2">
          {room.moreImages.map((item, idx) => (
            <img src={item} alt={`${room.name} - ${idx + 1}`} key={idx} className="w-full h-40 object-cover rounded"/>
          ))}
        </div>
      </div>

      <div className="px-1"> 
        { room.maximumGuest } Guests • <span></span>
        { room.bedrooms } Bedrooms • <span></span>
        { room.beds } beds • <span></span>
        { room.baths } baths
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

            <div>
                <h1 className="text-2xl mt-6 font-medium">About this place</h1>
                <p className="mb-2 mt-2">{room.description}</p>
                <p className="mb-1 mt-2"> <span className="font-semibold">Location:</span> {room.location}</p>
                <p className="mb-1 mt-2"> <span className="font-semibold">Address:</span> {room.address}</p>
                <p className="mb-1 mt-2"> <span className="font-semibold">City:</span> {room.city}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-t border-gray-300 pt-6">
            <h3 className="text-2xl font-medium mb-2">Hosted by {host.firstName}</h3>
            <div>
              {host.superHost && <h3 className="text-green-950 text-sm font-bold mb-1 flex items-center gap-2"> <span className="text-green-700"><IoIosCheckmarkCircle/></span> Super Host</h3>}
            </div>
            <p> {host.yearsOfHosting } years of hosting</p>
          </div>

          <div className="px-6 py-8 border border-gray-200 rounded-2xl shadow-lg bg-white max-w-md">
              <div className="mb-4">
                <p className="text-xl font-semibold text-gray-800">${room.price} <span className="text-base font-normal">/ night</span></p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="border rounded-lg p-2">
                  <label className="block text-gray-500 text-xs font-semibold">Check-in</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border-none focus:ring-0 text-gray-800 text-sm"
                  />
                </div>
                <div className="border rounded-lg p-2">
                  <label className="block text-gray-500 text-xs font-semibold">Check-out</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border-none focus:ring-0 text-gray-800 text-sm"
                  />
                </div>
              </div>

              <button onClick={handleReserve}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white rounded-xl py-3 font-medium hover:from-gray-900 hover:to-black transition-all shadow-md"
                > Reserve
              </button>

              <p className="text-xs text-center text-gray-500 mt-3">
                Not charged yet
              </p>
          </div>
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
            <li><span className="font-semibold">Check-in:</span> {room.checkIn}</li>
            <li><span className="font-semibold">Check-out:</span> {room.checkOut}</li>
            <li><span className="font-semibold">Cleaning Fee:</span> {room.cleaningFee}</li>
            <li><span className="font-semibold">Service Fee:</span> {room.serviceFee}</li>
            <li><span className="font-semibold">Quiet Hours:</span> {room.quietHours}</li>
            <li><span className="font-semibold">Maximum Guest:</span> {room.maximumGuest}</li>
            <li><span className="font-semibold">Pets Allowed:</span> {room.petsAllowed}</li>
            <li><span className="font-semibold">Parties:</span> {room.partiesAllowed}</li>
            <li><span className="font-semibold">Smoking Allowed:</span> {room.smokingAllowed}</li>
            <li><span className="font-semibold">Cancellation policy:</span> {room.cancellationPolicy}</li>
            <li><span className="font-semibold">Safety & Property:</span> {room.safetyAndProperty}</li>
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
            <img src={host.profileImage} alt={host.firstName} className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover" />
            {host.isSuperhost && (
              <div className="absolute bottom-2 right-10 bg-pink-600 text-white rounded-full p-1 text-xs"> ✔ </div>
            )}
          </div>
          
          <h2 className="text-2xl font-medium mt-4">{host.firstName}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span>🏅</span> Superhost
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">{host.reviews}</span>
              <span className="text-gray-500">Reviews</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">{host.rating}★</span>
              <span className="text-gray-500">Rating</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium mr-1">{host.yearsOfHosting}</span>
              <span className="text-gray-500">Years hosting</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-medium">{host.firstName} is a Superhost</h3>
            <p className="text-gray-600 mt-1">
              Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium">Host details</h4>
            <p className="text-gray-600 mt-1">Response rate: {host.responseRate}%</p>
            {host.responseHour > 1 ? 
              <p className="text-gray-600">Responds within {host.responseHour} hours</p> 
              : <p className="text-gray-600">Responds within {host.responseHour} hour</p> 
            }
          </div>

          <button className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md font-medium cursor-pointer">
            <a href={`https://wa.me/${host.phone.replace('+', '')}`}  target="blank">Message host</a>
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

