
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Season = 'hujan' | 'kemarau' | 'peralihan';

interface WeatherContextType {
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState<Season>('hujan');

  return (
    <WeatherContext.Provider value={{ currentSeason, setCurrentSeason }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const SeasonSelector: React.FC = () => {
  const { currentSeason, setCurrentSeason } = useWeather();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Pilih Musim</h2>
      <div className={`p-4 rounded-lg mb-4 relative overflow-hidden ${
        currentSeason === 'hujan' ? 'season-bg-rainy' :
        currentSeason === 'kemarau' ? 'season-bg-dry' :
        'season-bg-transition'
      } h-32`}>
        {currentSeason === 'hujan' && (
          <>
            <div className="rain-drop animate-rain" style={{ left: '10%', animationDelay: '0s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '20%', animationDelay: '0.2s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '30%', animationDelay: '0.5s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '40%', animationDelay: '0.1s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '50%', animationDelay: '0.4s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '60%', animationDelay: '0.6s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '70%', animationDelay: '0.3s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '80%', animationDelay: '0.7s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '90%', animationDelay: '0.2s' }}></div>
          </>
        )}
        
        {currentSeason === 'kemarau' && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full animate-sun-pulse"></div>
        )}
        
        {currentSeason === 'peralihan' && (
          <>
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full"></div>
            <div className="rain-drop animate-rain" style={{ left: '70%', animationDelay: '0.3s' }}></div>
            <div className="rain-drop animate-rain" style={{ left: '80%', animationDelay: '0.7s' }}></div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button 
          className={`p-2 rounded ${currentSeason === 'hujan' ? 'bg-farm-sky text-white' : 'bg-gray-100'}`}
          onClick={() => setCurrentSeason('hujan')}
        >
          Musim Hujan
        </button>
        <button 
          className={`p-2 rounded ${currentSeason === 'kemarau' ? 'bg-yellow-400 text-white' : 'bg-gray-100'}`}
          onClick={() => setCurrentSeason('kemarau')}
        >
          Musim Kemarau
        </button>
        <button 
          className={`p-2 rounded ${currentSeason === 'peralihan' ? 'bg-gradient-to-r from-farm-sky to-yellow-400 text-white' : 'bg-gray-100'}`}
          onClick={() => setCurrentSeason('peralihan')}
        >
          Peralihan
        </button>
      </div>
    </div>
  );
};
