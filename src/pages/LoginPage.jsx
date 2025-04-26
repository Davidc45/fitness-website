import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const VALID_EMAIL = 'user@example.com';
  const VALID_PASSWORD = 'password123';

  const handleSubmit = e => {
    e.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      
      setError('');
      navigate('/welcome');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        {error && (
          <p className="mb-4 text-red-500 text-center">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
