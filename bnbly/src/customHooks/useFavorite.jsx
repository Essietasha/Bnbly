import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // adjust path
import { AuthContext } from "../context/AuthContext";

export default function useFavorite(room) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  // Real time listener for favorite status
  useEffect(() => {
    if (!user || !room?.id) {
      setIsFav(false);
      return;
    }

    const favRef = doc(db, "users", user.uid, "favorites", room.id);
    const stopDocListener = onSnapshot(favRef, (userFavDoc) => {
      setIsFav(userFavDoc.exists());
    });

    return () => stopDocListener();
  }, [user, room?.id]);

  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const favRef = doc(db, "users", user.uid, "favorites", room.id);

    if (isFav) {
      await deleteDoc(favRef);
    } else {
      await setDoc(favRef, {
        name: room.name,
        price: room.price,
        image: room.image,
        rating: room.rating,
        topTen: room.topTen || false,
      });
    }
  };

  return { isFav, toggleFavorite };
}

// USAGE IN PAGES/COMPONENTS
// const { isFav, toggleFavorite } = useFavorite(room);

// onSnapshot is basically getDoc but live. 
  // It's like telling Firestore: Run this function every time the data changes, so it’s always up-to-date without me asking again.