import React from 'react'
import { seedAll } from '../scripts/seedRooms';
import { useState } from 'react';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


const deleteCollection = async (collectionName) => {  
  const colRef = collection(db, collectionName);
  const snapshot  = await getDocs(colRef);

  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, collectionName, docSnap.id));
  }
  console.log(`Deleted all from ${collectionName}`);
};


const deleteAllCollections = async () => {
  const collectionsToDelete = [
    "popularHomesInLagos",
    "availableNextMonthIsland",
    "homesOnTheMainland",
    "availableNextMonthMainland",
    "homesOnTheIsland",
    "stayInIkeja",
  ];

  for (const name of collectionsToDelete) {
    await deleteCollection(name);
  }
  console.log("All collections cleared");
};


const ManageDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedAll();
    } catch (error) {
      console.log("Seeding failed:", error);
    }
    setIsSeeding(false);
    // Reminder: Await - means Pause here until this async function (or Promise) finishes, then continue with the next line.
      //  If we have ten functions, await will make them all wait one after the other - in sequence.
      // Functions before await will run immediately. Only the line with await (and anything after it) will wait for the result
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete?");
    if (!confirmDelete) {
      return;
    };

    setIsDeleting(true);
    try {
      await deleteAllCollections();
    } catch (error) {
      console.log("Deleting failed:", error);
    }
    setIsDeleting(false);
  };

  return (
    <>
    <button 
      className='font-bold text-white cursor-pointer m-3 py-2 px-4 border rounded-2xl bg-black' 
      onClick={handleSeed}
      disabled={isSeeding}> 
      {isSeeding ? "Seeding..." : "Seed Data"} 
    </button>

    <button 
      className='font-bold text-white cursor-pointer m-3 py-2 px-4 border rounded-2xl bg-red-500' 
      onClick={handleDelete}
      disabled={isDeleting}> 
      {isDeleting ? "Deleting..." : "Delete"} 
    </button>
    </>
  )
};
export default ManageDataButton;
