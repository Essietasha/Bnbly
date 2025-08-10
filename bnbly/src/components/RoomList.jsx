import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from './RoomCard';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

import { FaArrowRight } from 'react-icons/fa';

const RoomList = ({title, collectionName}) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const [favIds, setFavIds] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setRooms(data);
            } catch (error) {
                console.log(`Error fetching from ${collectionName}`, error);
            } finally {
              setLoading(false);
            }
        };

        fetchRooms();
    }, [collectionName]);

    const limitedCategory = rooms.slice(0, 6)

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

  return (
  <>
    <hr className='mt-6 border-gray-300'/>
    <div>
      <div className="px-5 pt-6 flex justify-between items-center">
        <h1 className='font-semibold text-[1.2rem]'>{title}</h1>
        <Link to={`/rooms/${collectionName}`}
          className="text-black text-sm flex items-center hover:underline">
          <FaArrowRight className="ml-1" />
        </Link>
      </div>  

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          { loading ? (
            // show 6 gray boxes while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-200 h-60 rounded-xl animate-pulse" />
            ))
          ) : (
            limitedCategory.map((room) => (
              <RoomCard key={room.id} 
                room={room} 
                collectionName={collectionName} 
                isFav={favIds.includes(room.id)} 
                onFavChange={updateFavState}/>
            ))
          )}
      </div>
    </div>
  </>
  )
}

export default RoomList;