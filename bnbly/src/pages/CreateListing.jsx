import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
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
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "amenities") {
      setRoomData((prev) => {
        const updatedAmenities = checked ? [...prev.amenities, value] // add it to the new array checked
                                : 
                                prev.amenities.filter((amenity) => amenity !== value); // remove if the item is unchecked

        return { ...prev, amenities: updatedAmenities };
      });
    } else {
      setRoomData((prev) => ({ ...prev, [name]: value }));
    }
  }; // If I have fields like title, price, location, etc., with name attributes, this makes sure typing updates my state.
    // [name]: value = title: "Cozy Apartment in Houston"
    
  const handleImageChange = (index, value) => {
    const updatedImages = [...roomData.moreImages];
    updatedImages[index] = value;
    setRoomData({ ...roomData, moreImages: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomData.image && !roomData.moreImages.some(img => img.trim() !== "")) {
      alert("Please add at least one image.");
      return;
    };

    const additionalImages = roomData.moreImages.filter(img => img.trim() !== "");
    if (additionalImages.length < 1) {
      alert("Please add 4 additional images.");
      return;
    }
    // Custom ID
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedTimestamp = `${day}${month}${year}${hours}${minutes}`;
    const locationId = roomData.location.toLowerCase().replace(/\s+/g, "");
    const listingId = `${locationId}${formattedTimestamp}`;
    
    try {
      await setDoc(doc(db, "apartments", listingId), {
      // await addDoc(collection(db, "apartments", listingId), {
        listingId,
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
        location: roomData.location.trim().toLowerCase(),
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
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create a Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter property name"
            value={roomData.name} 
            onChange={handleChange} 
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input 
            type="number" 
            name="price" 
            placeholder="Price per night"
            value={roomData.price} 
            onChange={handleChange} 
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Apartment Image</label>
          <input 
            type="url" 
            name="image" 
            placeholder="Image URL"
            value={roomData.image} 
            onChange={handleChange} 
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            placeholder="Write a brief description"
            value={roomData.description} 
            onChange={handleChange} 
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm min-h-[100px]" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            placeholder="e.g. 2"
            value={roomData.bedrooms}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Beds</label>
          <input
            type="number"
            name="beds"
            placeholder="e.g. 3"
            value={roomData.beds}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms</label>
          <input
            type="number"
            name="baths"
            placeholder="e.g. 2"
            value={roomData.baths}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            placeholder="City name"
            value={roomData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            placeholder="Street address"
            value={roomData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm min-h-[80px]"
            required
          />
        </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <select
          name="location"
          value={roomData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
          required
        >
          <option value="">Select Location</option>
          {statesData.map((state) => (
            <option key={state.key} value={state.label}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <p className="font-semibold text-gray-800 mb-3">Select Amenities</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {amenities.map((amenity) => (
            <label 
              key={amenity} 
              className="flex items-center space-x-2 text-sm text-gray-700"
            >
              <input
                type="checkbox" 
                name="amenities" 
                value={amenity}
                onChange={handleChange} 
                className="text-green-600 focus:ring-green-500"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cleaning Fee</label>
          <input
            type="number"
            name="cleaningFee"
            placeholder="e.g. 50"
            value={roomData.cleaningFee}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Fee</label>
          <input
            type="number"
            name="serviceFee"
            placeholder="e.g. 20"
            value={roomData.serviceFee}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            required
          />
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
            <input 
              type="time" 
              name="checkIn" 
              value={roomData.checkIn} 
              onChange={handleChange} 
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
            <input 
              type="time" 
              name="checkOut" 
              value={roomData.checkOut} 
              onChange={handleChange} 
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Guests</label>
          <input
            type="number"
            name="maximumGuest"
            value={roomData.maximumGuest}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            placeholder="e.g. 4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
          <textarea
            name="cancellationPolicy"
            value={roomData.cancellationPolicy}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm min-h-[100px]"
            placeholder="Free cancellation within 48 hours or Full refund up to 5 days before check-in."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Safety & Property</label>
          <textarea
            name="safetyAndProperty"
            value={roomData.safetyAndProperty}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm min-h-[100px]"
            placeholder="Full security"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quiet Hours</label>
          <input
            type="text"
            name="quietHours"
            value={roomData.quietHours}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm"
            placeholder="10PM - 7AM"
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Allowed</label>
          <div className="flex space-x-6 text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="smokingAllowed"
                value="yes"
                checked={roomData.smokingAllowed === "yes"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="smokingAllowed"
                value="no"
                checked={roomData.smokingAllowed === "no"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pets Allowed</label>
          <div className="flex space-x-6 text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="petsAllowed"
                value="yes"
                checked={roomData.petsAllowed === "yes"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="petsAllowed"
                value="no"
                checked={roomData.petsAllowed === "no"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Parties Allowed</label>
          <div className="flex space-x-6 text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="partiesAllowed"
                value="yes"
                checked={roomData.partiesAllowed === "yes"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="partiesAllowed"
                value="no"
                checked={roomData.partiesAllowed === "no"}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-800 mb-3">Additional Images</p>
          {roomData.moreImages.map((img, index) => (
            <input
              key={index}
              type="url"
              placeholder={`Image URL ${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg shadow-sm mb-2"
            />
          ))}
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Submit Listing
        </button>
      </form>
    </div>
    
    <LinksNavigation/>
    </>
  );
};

export default CreateListing;


// import { useState, useEffect } from "react";
// import { db, auth } from "../firebase/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { collection, doc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
// import LinksNavigation from "../components/LinksNavigation";
// import { amenities, statesData } from "../data/statesData";

// const CreateListing = () => {
//   const navigate = useNavigate();
//   const [isHost, setIsHost] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [roomData, setRoomData] = useState({
//     name: "",
//     location: "",
//     price: "",
//     description: "",
//     image: "",
//     bedrooms: "",
//     beds: "",
//     baths: "",
//     city: "",
//     address: "",
//     amenities: [],
//     cleaningFee: "",
//     serviceFee: "",
//     checkIn: "",
//     checkOut: "",
//     maximumGuest: "",
//     cancellationPolicy: "",
//     safetyAndProperty: "",
//     quietHours: "",
//     smokingAllowed: "",
//     petsAllowed: "",
//     partiesAllowed: "",
//     moreImages: ["", "", "", ""],
//   });

//   useEffect(() => {
//     const checkHost = async () => {
//       const q = query(collection(db, "hosts"), where("uid", "==", auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         setIsHost(true);
//       }
//       setLoading(false);
//     };
//     checkHost();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox" && name === "amenities") {
//       setRoomData((prev) => {
//         const updatedAmenities = checked ? [...prev.amenities, value] // add it to the new array checked
//                                 : 
//                                 prev.amenities.filter((amenity) => amenity !== value); // remove if the item is unchecked

//         return { ...prev, amenities: updatedAmenities };
//       });
//     } else {
//       setRoomData((prev) => ({ ...prev, [name]: value }));
//     }
//   }; // If I have fields like title, price, location, etc., with name attributes, this makes sure typing updates my state.
//     // [name]: value = title: "Cozy Apartment in Houston"
    
//   const handleImageChange = (index, value) => {
//     const updatedImages = [...roomData.moreImages];
//     updatedImages[index] = value;
//     setRoomData({ ...roomData, moreImages: updatedImages });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!roomData.image && !roomData.moreImages.some(img => img.trim() !== "")) {
//       alert("Please add at least one image.");
//       return;
//     };

//     const additionalImages = roomData.moreImages.filter(img => img.trim() !== "");
//     if (additionalImages.length < 4) {
//       alert("Please add 4 additional images.");
//       return;
//     }
//     // Custom ID
//     const now = new Date();
//     const day = String(now.getDate()).padStart(2, "0");
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     const year = String(now.getFullYear());
//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");

//     const formattedTimestamp = `${day}${month}${year}${hours}${minutes}`;
//     const locationId = roomData.location.toLowerCase().replace(/\s+/g, "");
//     const listingId = `${locationId}${formattedTimestamp}`;
    
//     try {
//       await setDoc(doc(db, "apartments", listingId), {
//       // await addDoc(collection(db, "apartments", listingId), {
//         listingId,
//         ...roomData,
//         hostId: auth.currentUser.uid,
//         rating: 0,
//         reviews: 0,
//         guestFavorite: false,
//         topTen: false,
//         reviewStats: {
//           cleanliness: 0,
//           accuracy: 0,
//           communication: 0,
//           location: 0,
//           checkIn: 0,
//           value: 0,
//         },
//         createdAt: serverTimestamp(),
//       });
//       alert("Listing created successfully!");
//       navigate("/mylistings");
//     } catch (error) {
//       console.error("Error adding listing: ", error);
//     }
//   };

//   if (loading) return <p className="flex items-center justify-center h-lvh">Loading...</p>;

//   if (!isHost) {
//     return <p className="flex items-center justify-center h-lvh text-red-600 font-semibold">You must be a host to create a listing.</p>;
//   }

//   return (
//     <>
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input type="text" name="name" placeholder="name" value={roomData.name} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="number" name="price" placeholder="Price" value={roomData.price} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="url" name="image" placeholder="Image URL" value={roomData.image} onChange={handleChange} className="border p-2 rounded" />
//         <textarea name="description" placeholder="Description" value={roomData.description} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="number" name="bedrooms" placeholder="Number of Bedrooms" value={roomData.bedrooms} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="number" name="beds" placeholder="Number of Beds" value={roomData.beds} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="number" name="baths" placeholder="Number of Bathrooms" value={roomData.baths} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="text" name="city" placeholder="City" value={roomData.city} onChange={handleChange} className="border p-2 rounded" required />
//         <textarea name="address" placeholder="Address" value={roomData.address} onChange={handleChange} className="border p-2 rounded" required />

//         <select name="location" value={roomData.location} onChange={handleChange} className="border p-2 rounded" required>
//           <option value="">Select Location</option>
//           {statesData.map((state) => (
//             <option key={state.key} value={state.label}> {state.label} </option>
//           ))}
//         </select>

//         <div className="border p-2 rounded">
//           <p className="font-semibold mb-2">Select Amenities:</p>
//           {amenities.map((amenity) => (
//             <label key={amenity} className="block">
//               <input
//                 type="checkbox" name="amenities" value={amenity}
//                 onChange={handleChange} className="mr-2"/>
//                 {amenity}
//             </label>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="number" name="cleaningFee" placeholder="Cleaning Fee"
//             value={roomData.cleaningFee} onChange={handleChange} className="border p-2 rounded" required
//           />
//           <input
//             type="number" name="serviceFee" placeholder="Service Fee" 
//             value={roomData.serviceFee} onChange={handleChange} className="border p-2 rounded" required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Check-In</label>
//             <input
//               type="time" name="checkIn" value={roomData.checkIn} onChange={handleChange} className="w-full border rounded p-2"/>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Check-Out</label>
//             <input
//               type="time" name="checkOut" value={roomData.checkOut} onChange={handleChange} className="w-full border rounded p-2"/>
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Maximum Guests</label>
//           <input
//             type="number" name="maximumGuest" value={roomData.maximumGuest}
//             onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g. 4"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Cancellation Policy</label>
//           <textarea
//             name="cancellationPolicy" value={roomData.cancellationPolicy} onChange={handleChange}
//             className="w-full border rounded p-2" placeholder="Free cancellation within 48 hours or Full refund up to 5 days before check-in."
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Safety & Property</label>
//           <textarea
//             name="safetyAndProperty"  value={roomData.safetyAndProperty}
//             onChange={handleChange} className="w-full border rounded p-2" placeholder="Full security"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Quiet Hours</label>
//           <input
//             type="text" name="quietHours" value={roomData.quietHours} onChange={handleChange}
//             className="w-full border rounded p-2" placeholder="10PM - 7AM"
//           />
//         </div>

//         <div>
//           <label>Smoking Allowed</label>
//           <div className="flex space-x-4">
//             <label>
//               <input
//                 type="radio" name="smokingAllowed" value="yes" checked={roomData.smokingAllowed === "yes"} onChange={handleChange}/>
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio" name="smokingAllowed" value="no" checked={roomData.smokingAllowed === "no"}onChange={handleChange}/>
//               No
//             </label>
//           </div>
//         </div>

//         <div>
//           <label>Pets Allowed</label>
//           <div className="flex space-x-4">
//             <label>
//               <input
//                 type="radio" name="petsAllowed" value="yes" checked={roomData.petsAllowed === "yes"} onChange={handleChange}/>
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio" name="petsAllowed" value="no" checked={roomData.petsAllowed === "no"} onChange={handleChange}/>
//               No
//             </label>
//           </div>
//         </div>

//         <div>
//           <label>Parties Allowed</label>
//           <div className="flex space-x-4">
//             <label>
//               <input
//                 type="radio" name="partiesAllowed" value="yes" checked={roomData.partiesAllowed === "yes"} onChange={handleChange}/>
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio" name="partiesAllowed" value="no" checked={roomData.partiesAllowed === "no"} onChange={handleChange}/>
//               No
//             </label>
//           </div>
//         </div>

//         <div>
//           <p className="font-semibold mb-2">Additional Images</p>
//           {roomData.moreImages.map((img, index) => (
//             <input
//               key={index} type="url" placeholder={`Image URL ${index + 1}`}
//               value={img} onChange={(e) => handleImageChange(index, e.target.value)} className="border p-2 rounded w-full mb-2"/>
//           ))}
//         </div>

//         <button type="submit" className="bg-green-600 text-white p-2 rounded cursor-pointer">Submit</button>
//       </form>
//     </div>
    
//     <LinksNavigation/>
//     </>
//   );
// };

// export default CreateListing;
