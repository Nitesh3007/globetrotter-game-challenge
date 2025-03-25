import React, { useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { useGameStore } from './store/gameStore';
import UsernameForm from './components/UsernameForm';
import Game from './components/Game';

function App() {
  const { username, setInviterInfo } = useGameStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteId = params.get('invite');
    
    if (inviteId) {
      // In a real app, we would fetch the inviter's score from a backend
      // For now, we'll use a mock score
      setInviterInfo(inviteId, 5);
    }
  }, [setInviterInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe2 className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Globetrotter Challenge</h1>
          </div>
          <p className="text-xl opacity-90">Test your knowledge of world-famous destinations!</p>
        </header>

        {!username ? <UsernameForm /> : <Game />}
      </div>
    </div>
  );
}

export default App;