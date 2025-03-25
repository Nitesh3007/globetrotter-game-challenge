import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/gameStore';
import { Destination } from '../types';
import { MapPin, Award, Share2 } from 'lucide-react';
import ShareCard from './ShareCard';
import destinationsData from '../data/destinations.json';

function Game() {
  const { 
    currentDestination,
    score,
    totalPlayed,
    username,
    inviterId,
    inviterScore,
    incrementScore,
    incrementTotalPlayed,
    setCurrentDestination
  } = useGameStore();

  const [selectedClue, setSelectedClue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [funFact, setFunFact] = useState('');
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    fetchNewDestination();
  }, []);

  const fetchNewDestination = () => {
    try {
      const destinations: Destination[] = destinationsData.destinations;
      
      const randomIndex = Math.floor(Math.random() * destinations.length);
      const destination = destinations[randomIndex];
      
      const clueIndex = Math.floor(Math.random() * destination.clues.length);
      setSelectedClue(destination.clues[clueIndex]);
      
      const wrongOptions = destinations
        .filter(d => d.city !== destination.city)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(d => d.city);
      
      const allOptions = [...wrongOptions, destination.city];
      setOptions(allOptions.sort(() => Math.random() - 0.5));
      
      setCurrentDestination(destination);
      setShowResult(false);
      setShowShareCard(false);
    } catch (error) {
      console.error('Error loading destination:', error);
    }
  };

  const handleAnswer = (selectedCity: string) => {
    const correct = selectedCity === currentDestination?.city;
    setIsCorrect(correct);
    
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      incrementScore();
    }
    
    const factIndex = Math.floor(Math.random() * currentDestination!.fun_fact.length);
    setFunFact(currentDestination!.fun_fact[factIndex]);
    
    incrementTotalPlayed();
    setShowResult(true);
  };

  const generatePlayerId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {inviterId && inviterScore !== null && !showShareCard && (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center">
          <p className="text-lg">
            You've been invited to beat a score of{' '}
            <span className="font-bold">{inviterScore}</span>!
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">{username}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">Score: {score}/{totalPlayed}</span>
          </div>
          <button
            onClick={() => setShowShareCard(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Challenge Friends
          </button>
        </div>
      </div>

      {showShareCard ? (
        <ShareCard
          username={username!}
          score={score}
          totalPlayed={totalPlayed}
          playerId={generatePlayerId()}
        />
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
          {!showResult ? (
            <>
              <h2 className="text-2xl font-semibold mb-6">Where am I?</h2>
              <p className="text-lg mb-8 italic">&quot;{selectedClue}&quot;</p>
              <div className="grid grid-cols-2 gap-4">
                {options.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleAnswer(city)}
                    className="bg-white/20 hover:bg-white/30 transition-colors py-3 px-6 rounded-lg text-lg font-medium"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <h2 className={`text-3xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct! 🎉' : 'Not quite! 😢'}
              </h2>
              <p className="text-xl">
                The answer was: <span className="font-semibold">{currentDestination?.city}</span>
              </p>
              <div className="bg-white/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Fun Fact!</h3>
                <p className="text-lg">{funFact}</p>
              </div>
              <button
                onClick={fetchNewDestination}
                className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Next Destination
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;