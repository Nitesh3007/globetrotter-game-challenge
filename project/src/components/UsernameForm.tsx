import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

function UsernameForm() {
  const [inputUsername, setInputUsername] = useState('');
  const setUsername = useGameStore((state) => state.setUsername);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Traveler!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Choose your explorer name
          </label>
          <input
            type="text"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Enter your username"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Adventure
        </button>
      </form>
    </div>
  );
}

export default UsernameForm;