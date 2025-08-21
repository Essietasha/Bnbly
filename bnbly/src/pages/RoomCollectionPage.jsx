import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const RoomCollectionPage = () => {
    const formatCollectionName = (name) => {
    if (!name) return '';
    return name.replace(/([A-Z])/g, ' $1').trim(); // Find every capital letter (A–Z) and put a space before it.
    };

    const rooms = useLoaderData();

    const { collectionName } = useParams(); 
    //useParams() returns an object containing all the dynamic URL parameters from the current route.
    //  path='rooms/:collectionName' - rooms/popularHomes - { collectionName: "popularHomes" }
  
  
  return (
    <div className="p-6">
      <h1 className="text-[1.2rem] font-bold capitalize mb-4">
        {formatCollectionName(collectionName)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.length > 0 ? (
          rooms.map(room => <RoomCard key={room.id} room={room} />)
        ) : (
          <p>No rooms found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default RoomCollectionPage;

// Here..........
// roomsLoader function in loaders fetches the correct collection dynamically.
// RoomCollectionPage receives it via useLoaderData() and can display it dynamically using useParams() to get the name.
// I have linked to it dynamically from the RoomList in the HomePage via <Link to={/rooms/${collectionName}}>
// And the dynamic path set in the App route.