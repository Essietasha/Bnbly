import React from 'react'

const Loading = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
    {Array.from({ length: 12 }).map((_, index) => (
        <div
        key={index}
        className="bg-gray-200 h-60 rounded-xl animate-pulse"
        />
    ))}
    </div>
  )
}

export default Loading;

export const DetailsLoading = () => {
  return (
    <>
    <p className='px-8 pt-8 text-gray-500'>Loading Details..</p>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
    {Array.from({ length: 2 }).map((_, index) => (
        <div
        key={index}
        className="bg-gray-200 rounded-xl animate-pulse h-lvh"
        />
    ))}
    </div>
    </>
  );
};

export const MyActivities = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {Array.from({ length: 12 }).map((_, index) => (
        <div
        key={index}
        className="bg-gray-200 h-60 rounded-xl animate-pulse"
        />
    ))}
    </div>
  );
};