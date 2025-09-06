import { useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";

const RoomsByLocationPage = () => {
  const rooms = useLoaderData();

  if (!rooms || rooms.length === 0) {
    return <p className="flex items-center justify-center h-screen text-[1.2rem] text-red-600">No rooms in this location..</p>
  }

  return (
    <>
    <h2 className="mt-4 text-center text-gray-500">Result for Apartments in {rooms[0].location}... </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-12">
      {rooms.map((room) => (
          <RoomCard
              key={room.id}
              room={room}
          />
      ))}
    </div>

    <LinksNavigation />
    </>
  );
};

export default RoomsByLocationPage;
