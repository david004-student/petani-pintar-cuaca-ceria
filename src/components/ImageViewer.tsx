
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageData {
  title: string;
  description: string;
  imageUrl: string;
}

interface ImageViewerProps {
  selectedCrop: 'padi' | 'jagung';
}

const ImageViewer: React.FC<ImageViewerProps> = ({ selectedCrop }) => {
  const [activeTab, setActiveTab] = useState<'hama' | 'pupuk'>('hama');

  // Database gambar hama dan pupuk
  const imageDatabase: Record<'padi' | 'jagung', Record<'hama' | 'pupuk', ImageData[]>> = {
    padi: {
      hama: [
        {
          title: 'Wereng Coklat',
          description: 'Serangga kecil yang menghisap cairan tanaman padi, menyebabkan daun menguning dan mengering.',
          imageUrl: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937'
        },
        {
          title: 'Penggerek Batang',
          description: 'Larva yang masuk ke dalam batang padi dan memakan bagian dalam, membuat batang mudah patah.',
          imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
        }
      ],
      pupuk: [
        {
          title: 'Pupuk Urea',
          description: 'Pupuk dengan kandungan nitrogen tinggi, baik untuk pertumbuhan daun padi.',
          imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
        },
        {
          title: 'Pupuk Kompos',
          description: 'Pupuk organik yang meningkatkan kesuburan tanah dan daya tahan tanaman padi.',
          imageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec871214838'
        }
      ]
    },
    jagung: {
      hama: [
        {
          title: 'Ulat Grayak',
          description: 'Ulat yang memakan daun jagung, menyebabkan lubang-lubang pada daun.',
          imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
        },
        {
          title: 'Penggerek Tongkol',
          description: 'Larva yang merusak biji jagung dengan cara masuk ke dalam tongkol.',
          imageUrl: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937'
        }
      ],
      pupuk: [
        {
          title: 'NPK',
          description: 'Pupuk lengkap dengan kandungan nitrogen, fosfor, dan kalium untuk pertumbuhan jagung optimal.',
          imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'
        },
        {
          title: 'Pupuk Kandang',
          description: 'Pupuk organik yang baik untuk memperbaiki struktur tanah dan nutrisi jagung.',
          imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07'
        }
      ]
    }
  };

  const images = imageDatabase[selectedCrop][activeTab];

  return (
    <Card className="w-full max-w-md mx-auto p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {activeTab === 'hama' ? 'Hama' : 'Pupuk'} untuk Tanaman {selectedCrop === 'padi' ? 'Padi' : 'Jagung'}
      </h2>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'hama' | 'pupuk')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hama">Hama</TabsTrigger>
          <TabsTrigger value="pupuk">Pupuk</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hama" className="mt-4">
          {images.map((image, index) => (
            <div key={`hama-${index}`} className="mb-4 bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-700">{image.description}</p>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="pupuk" className="mt-4">
          {images.map((image, index) => (
            <div key={`pupuk-${index}`} className="mb-4 bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-700">{image.description}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ImageViewer;
