import { NavLink } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 p-2 text-sm text-gray-900 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex flex-wrap items-center gap-2">
          <p>© 2025 Bnbly, Inc.</p>
          <span>·</span>
          <NavLink to="/terms" className="hover:underline">Terms</NavLink>
          <span>·</span>
          <NavLink to="/privacy" className="hover:underline">Privacy</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaFacebook size={18} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <FaXTwitter size={18} />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
