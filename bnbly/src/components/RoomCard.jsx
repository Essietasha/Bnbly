import React from 'react';
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';

const RoomCard = ({ room }) => {
    const [isFav, setIsFav] = useState(room.guestFavorite || false);

    const toggleFavorite = () => {
        setIsFav(prev => !prev);
    };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:scale-105 cursor-pointer">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg">{room.name}</h2>
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