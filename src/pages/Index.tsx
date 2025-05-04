
import React, { useState } from 'react';
import Header from '@/components/Header';
import CropSelector from '@/components/CropSelector';
import { WeatherProvider, SeasonSelector } from '@/components/WeatherContext';
import AdviceSection from '@/components/AdviceSection';
import QuestionForm from '@/components/QuestionForm';

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState<'padi' | 'jagung' | null>(null);

  const handleSelectCrop = (crop: 'padi' | 'jagung') => {
    setSelectedCrop(crop);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header title="Petani Pintar - Cuaca Ceria" />
      
      <main className="container px-4 py-8">
        <WeatherProvider>
          <div className="flex flex-col items-center">
            <CropSelector onSelectCrop={handleSelectCrop} selectedCrop={selectedCrop} />
            
            <SeasonSelector />
            
            {selectedCrop && <AdviceSection selectedCrop={selectedCrop} />}
            
            <QuestionForm selectedCrop={selectedCrop} />
          </div>
        </WeatherProvider>
      </main>
      
      <footer className="w-full py-4 text-center text-gray-600 text-sm">
        &copy; 2025 Petani Pintar - Cuaca Ceria | Asisten Virtual untuk Petani Indonesia
      </footer>
    </div>
  );
};

export default Index;
