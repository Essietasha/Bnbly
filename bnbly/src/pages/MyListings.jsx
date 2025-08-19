import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, "apartments"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const userListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(userListings);
      } catch (error) {
        console.error("Error fetching listings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p className="flex items-center justify-center h-lvh">Loading...</p>;
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-lvh">
        <p className="text-gray-600">You don't have any listings yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="pt-12 pb-6 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">My Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              collectionName="apartments"
              isFav={false} // hosts don't "favorite" their own listings
              onFavChange={() => {}} 
            />
          ))}
        </div>
      </div>
      <LinksNavigation />
    </>
  );
};
export default MyListings;
