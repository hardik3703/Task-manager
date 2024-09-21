'use client';
import { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', { name, email, password });
      setMessage('Registration successful!');
      setError(null);
      setTimeout(() => {
        router.push('/login'); // Navigate to /login after successful registration
      }, 1500); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setMessage(null);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>
        
        <div className="mb-5 flex items-center border border-gray-300 rounded-md shadow-sm">
          <FaUser className="text-gray-400 w-5 h-5 ml-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full px-3 py-2 border-0 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-5 flex items-center border border-gray-300 rounded-md shadow-sm">
          <FaEnvelope className="text-gray-400 w-5 h-5 ml-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border-0 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm">
          <FaLock className="text-gray-400 w-5 h-5 ml-3" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border-0 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Register
        </button>
        
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}


      </form>
    </div>
  );
};

export default RegisterForm;
