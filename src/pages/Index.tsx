
import React, { useState } from 'react';
import Header from '@/components/Header';
import CropSelector from '@/components/CropSelector';
import { WeatherProvider, SeasonSelector } from '@/components/WeatherContext';
import AdviceSection from '@/components/AdviceSection';
import QuestionForm from '@/components/QuestionForm';
import WhatsAppNotifier from '@/components/WhatsAppNotifier';

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState<'padi' | 'jagung' | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const handleSelectCrop = (crop: 'padi' | 'jagung') => {
    setSelectedCrop(crop);
  };
  
  const toggleWhatsApp = () => {
    setShowWhatsApp(!showWhatsApp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header title="Petani Pintar - Cuaca Ceria" />
      
      <main className="container px-4 py-8">
        <WeatherProvider>
          <div className="flex flex-col items-center">
            <CropSelector onSelectCrop={handleSelectCrop} selectedCrop={selectedCrop} />
            
            <SeasonSelector />
            
            {selectedCrop && (
              <>
                <AdviceSection selectedCrop={selectedCrop} />
                
                <div className="w-full max-w-md mx-auto mt-4">
                  <button 
                    onClick={toggleWhatsApp}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {showWhatsApp ? 'Sembunyikan Form WhatsApp' : 'Kirim Notifikasi WhatsApp'}
                  </button>
                </div>
                
                {showWhatsApp && <WhatsAppNotifier />}
              </>
            )}
            
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
