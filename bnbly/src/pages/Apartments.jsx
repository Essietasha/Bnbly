import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "apartments"));
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApartments(roomsData);
    };
    fetchRooms();
  }, []);

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
