import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import LinksNavigation from "../components/LinksNavigation";
import statesData from "../data/statesData";

const CreateListing = () => {
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const checkHost = async () => {
      const q = query(collection(db, "hosts"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsHost(true);
      }
      setLoading(false);
    };

    checkHost();
  }, []);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "apartments"), {
        ...roomData,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      alert("Listing created successfully!");
      navigate("/mylistings");
    } catch (error) {
      console.error("Error adding listing: ", error);
    }
  };

  if (loading) return <p className="flex items-center justify-center h-lvh">Loading...</p>;

  if (!isHost) {
    return <p className="flex items-center justify-center h-lvh text-red-600 font-semibold">You must be a host to create a listing.</p>;
  }

  return (
    <>
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="name" value={roomData.name} onChange={handleChange} className="border p-2 rounded" required />
        <select name="location" value={roomData.location} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Location</option>
          {statesData.map((state) => (
            <option key={state.key} value={state.label}> {state.label} </option>
          ))}
        </select>
        <input type="number" name="price" placeholder="Price" value={roomData.price} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={roomData.description} onChange={handleChange} className="border p-2 rounded" required />
        <input type="url" name="image" placeholder="Image URL" value={roomData.image} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded cursor-pointer">Submit</button>
      </form>
    </div>
    
    <LinksNavigation/>
    </>
  );
};

export default CreateListing;
