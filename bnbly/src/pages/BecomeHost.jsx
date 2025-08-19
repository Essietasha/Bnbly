import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

const BecomeHost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    profileImage: ""
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
        navigate("/createlisting");
      }
      setLoading(false);
    };
    checkHost();
  }, [navigate]);


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
        createdAt: serverTimestamp(),
      });
      alert("You are now a host!");
      navigate("/createlisting");
    } catch (error) {
      console.error("Error adding host: ", error);
    }
  };

  if (loading) return <p className="flex items-center justify-center h-lvh">Loading host status...</p>;

  if (isHost) return null; // avoids showing form flicker before redirect


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
