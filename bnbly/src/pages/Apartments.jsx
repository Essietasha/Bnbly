import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Loading from "../components/Loading"

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const [favIds, setFavIds] = useState([]);
  
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

    useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavIds([]);
        return;
      }
      const favRef = collection(db, "users", user.uid, "favorites");
      const favSnap = await getDocs(favRef);
      setFavIds(favSnap.docs.map(doc => doc.id));
    };

    fetchFavorites();
  }, [user]);

  // Handler to update favorites instantly in UI
  const updateFavState = (roomId, isAdding) => {
    setFavIds(prev =>
      isAdding ? [...prev, roomId] : prev.filter(id => id !== roomId)
    );
  };
  
  if (loading) {
    return <Loading />
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
      <div className="px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {apartments.map((apartment) => (
          <RoomCard
              key={apartment.id}
              room={apartment}
              collectionName="apartments"
              isFav={favIds.includes(apartment.id)}
              onFavChange={updateFavState}
          />
        ))}
      </div>

      <LinksNavigation/>
    </>
  );
};

export default Apartments;
