import React from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const roomsLoader = async ({ params }) => {
    const collectionName = params.collectionName;
    
  if (!collectionName) {
    throw new Error("No collection name provided in URL params.");
  }

    try{
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error(`Error fetching rooms from ${collectionName}`, error);
        throw new Response("Failed to load rooms", { status: 500 });
    }
};