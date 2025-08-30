import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext"; 

const PaymentPage = () => {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const taxes = 25;


    useEffect(() => {
        const fetchReservation = async () => {
        try {
            const resRef = doc(db, "reservations", reservationId);
            const resSnap = await getDoc(resRef);

            if (resSnap.exists()) {
            const reservationData = { id: resSnap.id, ...resSnap.data() };

            // fetch room details
            if (reservationData.roomId) {
                const roomRef = doc(db, "apartments", reservationData.roomId);
                const roomSnap = await getDoc(roomRef);

                if (roomSnap.exists()) {
                reservationData.room = { id: roomSnap.id, ...roomSnap.data() };
                }
            }
            setReservation(reservationData);
            } else {
            alert("Reservation not found.");
            navigate("/");
            }
        } catch (error) {
            console.error("Error fetching reservation:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchReservation();
    }, [reservationId, navigate]);


    const checkAvailability = async () => {
        if (!reservation?.roomId || !user?.uid) return false;

        const reservationsRef = collection(db, "reservations");
        const q = query(reservationsRef, where("roomId", "==", reservation.roomId));
        const querySnap = await getDocs(q);
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        let conflict = false;

        querySnap.forEach((docSnap) => {
        const data = docSnap.data();

        if (data.status === "confirmed") {
            const existingStart = new Date(data.startDate);
            const existingEnd = new Date(data.endDate);

            // Prevent same user booking same room again
            if (data.userId === user.uid && data.roomId === reservation.roomId) {
            conflict = true;
            return;
            }

            // Prevent overlapping dates
            if (start < existingEnd && end > existingStart) {
                conflict = true;
                return;
            }
        }
        });

        return !conflict;
    };

    const handleFakePayment = async () => {
        try {
        const available = await checkAvailability();
        if (!available) {
            alert("You've already reserved this room or it's unavailable for your dates.");
            navigate("/");
            return;
        }

        const resRef = doc(db, "reservations", reservationId);

        await updateDoc(resRef, {
            status: "confirmed",
        });

        alert("Payment successful! Reservation confirmed");
        navigate("/myreservations");
        } catch (error) {
        console.error("Error updating reservation:", error);
        console.log("Updating reservation", reservationId, "as user", user.uid);
        alert("Something went wrong.");
        }
    };

    if (loading) return <p className="p-6">Loading reservation...</p>;

    const nights = reservation?.startDate && reservation?.endDate
        ? Math.max(1, Math.ceil((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24)))
        : 1;
    const pricePerNight = Number(reservation?.room?.price);
    const serviceFee = Number(reservation?.room?.serviceFee);
    const cleaningFee = Number(reservation?.room?.cleaningFee);
    const totalPayment = pricePerNight * nights + serviceFee + cleaningFee + taxes;

    
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">Confirm and pay</h1>

        <div className="border rounded-2xl p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Your trip</h2>
          <div className="flex justify-between">
            <p className="font-medium">Dates</p>
            <p>{reservation?.startDate} <span className="font-semibold" >to</span> {reservation?.endDate}</p>
          </div>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Pay with</h2>
          <div className="flex items-center gap-3">
            <input type="radio" defaultChecked name="payment" />
            <label className="font-medium">Credit or Debit Card</label>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input type="radio" name="payment" />
            <label className="font-medium">PayPal</label>
          </div>
        </div>
      </div>

      <div className="border rounded-2xl p-6 shadow-md bg-white h-fit sticky top-6">
        <div className="flex gap-4 mb-4">
          <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={reservation?.room?.image || "https://via.placeholder.com/100"}
              alt="room" className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{reservation?.room?.name}</p>
            <p className="text-[0.7rem]">{reservation?.startDate} <span className="font-semibold" >to</span> {reservation?.endDate}</p>
            <p className="text-[0.8rem]"><span className=" text-yellow-500">★</span>{reservation?.room?.rating}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-3">Price details</h2>
        <div className="flex justify-between text-gray-700">
          <p>${pricePerNight} × {nights} nights</p>
          <p>${pricePerNight * nights}</p>
        </div>
        <div className="flex justify-between mt-2 text-gray-700">
          <p>Service fee</p>
          <p>${serviceFee}</p>
        </div>
        <div className="flex justify-between mt-2 text-gray-700">
          <p>Cleaning fee</p>
          <p>${cleaningFee}</p>
        </div>
        <div className="flex justify-between mt-2 text-gray-700">
          <p>Taxes</p>
          <p>${taxes}</p>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
          <p>Total (USD)</p>
          <p>${totalPayment}</p>
        </div>

        <button
          onClick={handleFakePayment}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl text-lg font-semibold cursor-pointer hover:opacity-90 transition"
            > Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;