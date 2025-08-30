import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export const locationRoomsLoader = async ({ params }) => {
  const { location } = params;

  try {
    const q = query(
      collection(db, "apartments"),
      where("location", "==", location),
      limit(20) 
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading rooms:", error);
    throw new Response("Error loading rooms", { status: 500 });
  }
};
