import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import LinksNavigation from "../components/LinksNavigation";


const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const taxes = 25;

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      try {
        const reservationsRef = collection(db, "reservations");
        const q = query(reservationsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedReservations = [];
        for (const docSnap of querySnapshot.docs) {
          const resData = { id: docSnap.id, ...docSnap.data() };

          // fetch room details
          if (resData.roomId) {
            const roomRef = doc(db, "apartments", resData.roomId);
            const roomSnap = await getDoc(roomRef);
            if (roomSnap.exists()) {
              resData.room = { id: roomSnap.id, ...roomSnap.data() };
            }
          }

          // calculate nights + total
          if (resData.startDate && resData.endDate && resData.room) {
            const nights = Math.max(
              1,
              Math.ceil(
                (new Date(resData.endDate) - new Date(resData.startDate)) /
                  (1000 * 60 * 60 * 24)
              )
            );
            const pricePerNight = Number(resData.room.price);
            const serviceFee = Number(resData.room.serviceFee);
            const cleaningFee = Number(resData.room.cleaningFee);
            resData.totalPrice =
              pricePerNight * nights + serviceFee + cleaningFee + taxes;
            resData.nights = nights;
          }

          fetchedReservations.push(resData);
        }

        setReservations(fetchedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6 h-lvh">
        <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
        <p>Loading your reservations...</p>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="p-6 h-lvh">
        <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
        <p>You don't have any reservations yet.</p>
      </div>
    );
  }

  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Reservations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="border rounded-2xl shadow-sm bg-white overflow-hidden hover:shadow-md transition"
          >
            <img
              src={res?.room?.image}
              alt={res?.room?.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{res?.room?.name}</h3>
              <p className="text-sm text-gray-600">
                {res.startDate} to {res.endDate} <span className="font-semibold" >({res.nights} nights)</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-yellow-500">★</span>{" "}
                {res?.room?.rating} · {res?.room?.reviews} reviews
              </p>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Price per night:</p>
                <p>${res?.room?.price}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Service Fee:</p>
                <p>${res?.room?.serviceFee}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Cleaning Fee:</p>
                <p>${res?.room?.cleaningFee}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Taxes:</p>
                <p>${taxes}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Total:</p>
                <p className="font-semibold">${res.totalPrice}</p>
              </div>
              <p
                className={`text-xs mt-2 font-medium ${
                  res.status === "confirmed"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {res.status?.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <LinksNavigation />
    </>
  );
};

export default MyReservations;
