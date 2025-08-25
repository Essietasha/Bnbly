import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const roomLoader = async ({ params }) => {
  const { collectionName, roomId } = params;

  try {
    const docRef = doc(db, collectionName, roomId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Room not found");
    }
  } catch (error) {
    throw new Response("Error loading room details", { status: 500 });
  }
};
