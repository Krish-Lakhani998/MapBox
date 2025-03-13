'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      router.push(`/map?address=${encodeURIComponent(address)}`);
    } catch (err) {
      console.error('Error processing address:', err);
      setError('Error processing your address. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-white/90 to-gray-50/90 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">Find Location</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="relative">
          <label htmlFor="address" className="block text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
            Enter your address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, Country"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:outline-none focus:border-purple-500 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm text-sm sm:text-base"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-400 text-xs sm:text-sm text-center">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl sm:rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          {loading ? 'Finding location...' : 'View on Map'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm; 