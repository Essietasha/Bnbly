import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from './Roomcard';
import { FaArrowRight } from 'react-icons/fa';

const RoomList = ({title, collectionName}) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setRooms(data);
            } catch (error) {
                console.log(`Error fetching from ${collectionName}`, error);
            }
        };

        fetchRooms();
    }, [collectionName]);

    const limitedCategory = rooms.slice(0, 6)

  return (
  <>
    <hr className='mt-6 border-gray-300'/>
    <div>
      <div className="px-5 pt-6 flex justify-between items-center">
        <h1 className='font-semibold text-[1.2rem]'>{title}</h1>
        <a href={`/rooms/${collectionName}`}
          className="text-black text-sm flex items-center hover:underline">
          <FaArrowRight className="ml-1" />
        </a>
      </div>  

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {limitedCategory.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  </>
  )
}

export default RoomList;