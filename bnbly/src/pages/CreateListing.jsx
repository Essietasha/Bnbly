import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import LinksNavigation from "../components/LinksNavigation";
import { amenities, statesData } from "../data/statesData";

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
    bedrooms: "",
    beds: "",
    baths: "",
    city: "",
    address: "",
    amenities: [],
    cleaningFee: "",
    serviceFee: "",
    checkIn: "",
    checkOut: "",
    maximumGuest: "",
    cancellationPolicy: "",
    safetyAndProperty: "",
    quietHours: "",
    smokingAllowed: "",
    petsAllowed: "",
    partiesAllowed: "",
    moreImages: ["", "", "", ""],
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

  const handleImageChange = (index, value) => {
    const updatedImages = [...roomData.moreImages];
    updatedImages[index] = value;
    setRoomData({ ...roomData, moreImages: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "apartments"), {
        ...roomData,
        hostId: auth.currentUser.uid,
        rating: 0,
        reviews: 0,
        guestFavorite: false,
        topTen: false,
        reviewStats: {
          cleanliness: 0,
          accuracy: 0,
          communication: 0,
          location: 0,
          checkIn: 0,
          value: 0,
        },
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
        <input type="number" name="price" placeholder="Price" value={roomData.price} onChange={handleChange} className="border p-2 rounded" required />
        <input type="url" name="image" placeholder="Image URL" value={roomData.image} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={roomData.description} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="bedrooms" placeholder="Number of Bedrooms" value={roomData.bedrooms} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="beds" placeholder="Number of Beds" value={roomData.beds} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="baths" placeholder="Number of Bathrooms" value={roomData.baths} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="city" placeholder="city" value={roomData.city} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="address" placeholder="Address" value={roomData.address} onChange={handleChange} className="border p-2 rounded" required />

        <select name="location" value={roomData.location} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Location</option>
          {statesData.map((state) => (
            <option key={state.key} value={state.label}> {state.label} </option>
          ))}
        </select>

        <div className="border p-2 rounded">
          <p className="font-semibold mb-2">Select Amenities:</p>
          {amenities.map((amenity) => (
            <label key={amenity} className="block">
              <input
                type="checkbox" name="amenities" value={amenity}
                onChange={handleChange} className="mr-2"/>
                {amenity}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number" name="cleaningFee" placeholder="Cleaning Fee"
            value={roomData.cleaningFee} onChange={handleChange} className="border p-2 rounded" required
          />
          <input
            type="number" name="serviceFee" placeholder="Service Fee" 
            value={roomData.serviceFee} onChange={handleChange} className="border p-2 rounded" required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Check-In</label>
            <input
              type="time" name="checkIn" value={roomData.checkIn} onChange={handleChange} className="w-full border rounded p-2"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Check-Out</label>
            <input
              type="time" name="checkOut" value={roomData.checkOut} onChange={handleChange} className="w-full border rounded p-2"/>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Maximum Guests</label>
          <input
            type="number" name="maximumGuest" value={roomData.maximumGuest}
            onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g. 4"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cancellation Policy</label>
          <textarea
            name="cancellationPolicy" value={roomData.cancellationPolicy} onChange={handleChange}
            className="w-full border rounded p-2" placeholder="Free cancellation within 48 hours or Full refund up to 5 days before check-in."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Safety & Property</label>
          <textarea
            name="safetyAndProperty"  value={roomData.safetyAndProperty}
            onChange={handleChange} className="w-full border rounded p-2" placeholder="Full security"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quiet Hours</label>
          <input
            type="text" name="quietHours" value={roomData.quietHours} onChange={handleChange}
            className="w-full border rounded p-2" placeholder="10PM - 7AM"
          />
        </div>

        <div>
          <label>Smoking Allowed</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio" name="smokingAllowed" value="yes" checked={roomData.smokingAllowed === "yes"} onChange={handleChange}/>
              Yes
            </label>
            <label>
              <input
                type="radio" name="smokingAllowed" value="no" checked={roomData.smokingAllowed === "no"}onChange={handleChange}/>
              No
            </label>
          </div>
        </div>

        <div>
          <label>Pets Allowed</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio" name="petsAllowed" value="yes" checked={roomData.petsAllowed === "yes"} onChange={handleChange}/>
              Yes
            </label>
            <label>
              <input
                type="radio" name="petsAllowed" value="no" checked={roomData.petsAllowed === "no"} onChange={handleChange}/>
              No
            </label>
          </div>
        </div>

        <div>
          <label>Parties Allowed</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio" name="partiesAllowed" value="yes" checked={roomData.partiesAllowed === "yes"} onChange={handleChange}/>
              Yes
            </label>
            <label>
              <input
                type="radio" name="partiesAllowed" value="no" checked={roomData.partiesAllowed === "no"} onChange={handleChange}/>
              No
            </label>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Additional Images</p>
          {roomData.moreImages.map((img, index) => (
            <input
              key={index} type="url" placeholder={`Image URL ${index + 1}`}
              value={img} onChange={(e) => handleImageChange(index, e.target.value)} className="border p-2 rounded w-full mb-2"/>
          ))}
        </div>
        
        <button type="submit" className="bg-green-600 text-white p-2 rounded cursor-pointer">Submit</button>
      </form>
    </div>
    
    <LinksNavigation/>
    </>
  );
};

export default CreateListing;
