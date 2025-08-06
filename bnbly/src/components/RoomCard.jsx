import React from 'react';
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const RoomCard = ({ room, collectionName }) => {
  
    const [isFav, setIsFav] = useState(room.guestFavorite || false);

    const toggleFavorite = () => {
        setIsFav(prev => !prev);
    };

  return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:scale-105">
        <NavLink to={`/rooms/${collectionName}/${room.id}`} >
          <div className="relative">
            {room.topTen && room.rating === 5.0 && (
              <div className="absolute top-2 left-2 bg-gray-100 text-black text-xs font-semibold px-2 py-1 rounded shadow">
                Guest favorite
              </div>
            )}
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-40 object-cover"
            />
          </div>
        </NavLink>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h2>{room.name}</h2>
            <button onClick={toggleFavorite} className="text-red-500">
              <FaHeart fill={isFav ? "red" : "grey"} />
            </button>
          </div>
          <p className="text-sm text-gray-600">${room.price} / night</p>
          <p className="text-xs text-yellow-600 mt-1">★ {room.rating}</p>
        </div>
      </div>
  )
}

export default RoomCard;