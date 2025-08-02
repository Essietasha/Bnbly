import React from 'react';
import { NavLink } from 'react-router-dom';

const LinksNavigation = () => {
  const footerLinks = [
    {
      title: 'Support',
      links: [
        'Customer Service',
        'Safety Guarantee',
        'Accessibility Help',
        'Community Guidelines',
        'Booking & Cancellation',
        'Neighborhood Feedback',
      ],
    },
    {
      title: 'Listings',
      links: [
        'List Your Space',
        'Offer a Local Tour',
        'Protection for Hosts',
        'Hosting Resources',
        'Host Forum',
        'Host Responsibility',
        'Partnered Apartments',
        'Free Hosting Workshop',
      ],
    },
    {
      title: 'Bnbly',
      links: [
        '2025 Platform Updates',
        'Press & News',
        'Join Our Team',
        'Investor Info',
        'Gift Credits',
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 px-4 mt-8 text-gray-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((text, idx) => {
                const route = '/' + text.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={idx}>
                    <NavLink
                      to={route}
                      className="hover:underline hover:text-black transition-colors duration-200 leading-6"
                    >
                      {text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default LinksNavigation;
