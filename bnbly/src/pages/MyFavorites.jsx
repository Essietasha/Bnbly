import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";
import { MyActivities } from "../components/Loading";


const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const favRef = collection(db, "users", user.uid, "favorites");
        const favSnap = await getDocs(favRef);

        const validFavs = [];

        for (const favDoc of favSnap.docs) {
          const favData = favDoc.data();
          const roomRef = doc(db, "apartments", favDoc.id);
          const roomSnap = await getDoc(roomRef);

          if (roomSnap.exists()) {
            // Room still exists; keep it
            validFavs.push({
              id: favDoc.id,
              ...favData,
            });
          } else {
            // Room was deleted from apartments; clean it from favorites
            await deleteDoc(favDoc.ref);
          }
        }

        setFavorites(validFavs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Remove from favorites instantly
  const updateFavState = (roomId, isAdding) => {
    if (!isAdding) {
      setFavorites((prev) => prev.filter((room) => room.id !== roomId));
    }
  };

  if (loading) {
    return (
      <MyActivities />
    );
  }

  return (
    <>
    <div className="px-6 py-12">
      <h1 className="text-xl font-semibold mb-3">My Favorites</h1>
      {favorites.length === 0 ? (
        <div>
            <p className="text-gray-500">You haven’t added any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              collectionName={room.collectionName}
              isFav={true}
              onFavChange={updateFavState}
            />
          ))}
        </div>
      )}
    </div>

    <LinksNavigation />
    </>
  );
};

export default MyFavorites;
