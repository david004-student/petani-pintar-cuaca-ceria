
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CropSelectorProps {
  onSelectCrop: (crop: 'padi' | 'jagung') => void;
  selectedCrop: 'padi' | 'jagung' | null;
}

const CropSelector: React.FC<CropSelectorProps> = ({ onSelectCrop, selectedCrop }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Pilih Tanaman</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedCrop === 'padi' ? 'border-4 border-farm-green bg-farm-rice' : 'bg-white'}`}
          onClick={() => onSelectCrop('padi')}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 mb-2 bg-farm-rice rounded-full flex items-center justify-center text-3xl">
              🌾
            </div>
            <span className="font-semibold">Padi</span>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all hover:shadow-lg ${selectedCrop === 'jagung' ? 'border-4 border-farm-green bg-farm-corn' : 'bg-white'}`}
          onClick={() => onSelectCrop('jagung')}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 mb-2 bg-farm-corn rounded-full flex items-center justify-center text-3xl">
              🌽
            </div>
            <span className="font-semibold">Jagung</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CropSelector;
