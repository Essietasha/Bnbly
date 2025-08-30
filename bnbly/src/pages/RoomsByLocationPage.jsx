import { useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import LinksNavigation from "../components/LinksNavigation";

const RoomsByLocationPage = () => {
  const rooms = useLoaderData();

  if (!rooms || rooms.length === 0) {
    return <p className="flex items-center justify-center h-screen text-[1.2rem] text-red-600 bg-black">No rooms in this location..</p>
  }

  return (
    <>
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
