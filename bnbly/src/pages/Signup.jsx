import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <form onSubmit={handleSignup} className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-[90%] max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <FaUserPlus className="text-blue-600 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"/>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300 disabled:opacity-50">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600"> Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline"> Login </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
