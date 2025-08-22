import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const BecomeHost = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    profileImage: "",
    responseHour: ""
  });
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const checkHost = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, "hosts"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsHost(true);
      }
      setLoading(false);
    };
    checkHost();
  }, );

  useEffect(() => {
    if (auth.currentUser?.email){
      setFormData((prev) => ({...prev, email: auth.currentUser.email}))
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "hosts"), {
        ...formData,
        uid: auth.currentUser.uid,
        isHost: true,
        rating: 0,
        reviews: 0,
        superHost: false,
        yearsOfHosting: 0,
        responseRate: 0,
        createdAt: serverTimestamp(),
      });
      alert("You are now a host!");
    } catch (error) {
      console.error("Error adding host: ", error);
    }
  };

  if (loading) return <p className="flex items-center justify-center h-lvh text-blue-600">Loading host status...</p>;
  if (isHost) {
    return (
      <div className="flex flex-col items-center justify-center h-lvh">
        <p className="text-green-600">You're already a host!</p>
        <NavLink to="/createlisting" className="font-semibold mt-4 px-4 py-2 border border-b-gray-800 bg-black text-white">
          Create a Listing
        </NavLink>
      </div>
    );
}

  return (
    <div className="pt-12 pb-6 max-w-lg mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">Become a Host</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text" name="firstName" placeholder="First Name"
          value={formData.firstName} onChange={handleChange} className="border p-2 rounded" required
        />
        <input
          type="text" name="lastName" placeholder="Last Name"
          value={formData.lastName} onChange={handleChange} className="border p-2 rounded" required
        />
        <input
          type="email" name="email" placeholder="Email Address"
          value={formData.email} onChange={handleChange} className="border p-2 rounded" required disabled={!!auth.currentUser?.email}
        />
        <select
          name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" required >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <input
          type="tel" name="phone" placeholder="Phone Number"
          value={formData.phone} onChange={handleChange} className="border p-2 rounded" required
        />
        <input
          type="number" name="responseHour" placeholder="In how many hours can you respond to a client?"
          value={formData.responseHour} onChange={handleChange} className="border p-2 rounded" required
        />
        <input
          type="url" name="profileImage" placeholder="Profile Image URL"
          value={formData.profileImage} onChange={handleChange} className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BecomeHost;
