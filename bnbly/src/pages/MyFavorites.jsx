import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";


const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
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
        const favRooms = favSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favRooms);
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
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 h-60 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">My Favorites</h1>
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
