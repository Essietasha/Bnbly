import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";
import { Link } from "react-router-dom";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "apartments"));
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApartments(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchRooms();
  }, []);
  
  if (loading) {
    return <p className="flex items-center justify-center h-lvh">Loading...</p>;
  }

  if (apartments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-lvh">
        <p className="text-red-600 font-semibold">You don't have any listings yet.</p>
        <Link to="/createlisting" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Create your first listing
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {apartments.map((apartment) => (
          <RoomCard
              key={apartment.id}
              room={apartment}
              collectionName="apartments" 
          />
        ))}
      </div>

      <LinksNavigation/>
    </>
  );
};

export default Apartments;
