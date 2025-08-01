import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomCard from './Roomcard';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "roomList"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRooms(data);
            } catch (error) {
                console.log("Error fetching rooms", error);
            }
        };

        fetchRooms();
    }, []);

  return (
  <>
    <hr className='mt-6 border-gray-300'/>

    <div>
      <h1 className='px-5 pt-6 font-semibold text-[1.2rem]'>Popular Homes in Nigeria</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {rooms.map((room) => (
          <Roomcard key={room.id} room={room} />
        ))}
      </div>
    </div>
  </>
  )
}

export default RoomList;