import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    };

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/homes');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-100">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Welcome Back</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 mb-4 text-sm rounded text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="yourmail@gmail..com" value={email}
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          <button type="button" className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)} >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        </div>

        <button type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading} >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600"> Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline"> Sign up </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
