import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Loading from "./Loading";

const locations = ["lagos", "abuja", "rivers", "anambra", "enugu", "oyo"];

const HomepageListing = () => {
  const [apartmentsByLocation, setApartmentsByLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      const data = {};
      try {
        for (const loc of locations) {
          const q = query( collection(db, "apartments"),
            where("location", "==", loc),
            // orderBy("createdAt", "desc"),
            limit(6)
          );
          const querySnapshot = await getDocs(q);
          data[loc] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log("Querying:", loc);
          console.log("Docs found:", querySnapshot.size);
        }
        setApartmentsByLocation(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
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

  // if (loading) return <p className="flex items-center justify-center h-lvh">Loading...</p>;
      if (loading) {
        return (
          <Loading />
        );
      }

  return (
    <div className="px-6 py-12">
    {locations.map(loc => (
        <div key={loc} className="mb-12">
        <h2 className="text-xl font-semibold mb-4 px-6">Apartments in {loc}</h2>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {loading ? (
            // show 6 gray boxes while loading
            Array.from({ length: 6 }).map((_, index) => (
                <div
                key={index}
                className="bg-gray-200 h-60 rounded-xl animate-pulse"
                />
            ))
            ) : apartmentsByLocation[loc] && apartmentsByLocation[loc].length > 0 ? (
            apartmentsByLocation[loc].map(apartment => (
                <RoomCard
                key={apartment.id}
                room={apartment}
                collectionName="apartments"
                isFav={favIds.includes(apartment.id)}
                onFavChange={updateFavState}
                />
            ))
            ) : (
            <p className="text-gray-500">No listings in {loc} yet.</p>
            )}
        </div>
        </div>
    ))}
    </div>
  );
};

export default HomepageListing;
