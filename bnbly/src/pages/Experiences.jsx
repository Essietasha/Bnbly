import React from "react";
import { GiMountainClimbing, GiCookingPot, GiMeditation, GiCityCar } from "react-icons/gi";

const ExperiencesPage = () => {
  const experiences = [
    { title: "City Tours", description: "Discover hidden gems in your city", icon: <GiCityCar size={40} /> },
    { title: "Adventure Trips", description: "Thrill-seeking experiences await", icon: <GiMountainClimbing size={40} /> },
    { title: "Culinary Classes", description: "Learn to cook like a top chef  & pro", icon: <GiCookingPot size={40} /> },
    { title: "Relax & Wellness", description: "Escape, unwind, and recharge", icon: <GiMeditation size={40} /> },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <h1 className="text-4xl font-bold mb-4 text-center text-purple-700">Experiences</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Discover exciting experiences. Coming soon to your city!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-pink-400 to-purple-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
              {exp.icon}
            </div>
            <h2 className="text-[1.1rem] font-bold mb-2 text-purple-700">{exp.title}</h2>
            <p className="text-gray-500 text-center mb-4">{exp.description}</p>
            <div className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full font-semibold">
              Coming Soon
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencesPage;
