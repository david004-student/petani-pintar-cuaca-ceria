
import React from 'react';
import { Card } from '@/components/ui/card';
import { useWeather } from './WeatherContext';

interface AdviceSectionProps {
  selectedCrop: 'padi' | 'jagung' | null;
}

const AdviceSection: React.FC<AdviceSectionProps> = ({ selectedCrop }) => {
  const { currentSeason } = useWeather();

  if (!selectedCrop) {
    return null;
  }

  const adviceData = {
    padi: {
      hujan: [
        "Pastikan sistem drainase di sawah berjalan lancar agar tidak tergenang air berlebih.",
        "Perhatikan tanda-tanda serangan hama seperti wereng dan keong mas yang biasanya meningkat saat musim hujan.",
        "Kurangi dosis pupuk nitrogen dan tingkatkan pupuk kalium untuk memperkuat batang.",
        "Pantau cuaca sebelum melakukan pemupukan agar pupuk tidak hanyut terbawa air.",
      ],
      kemarau: [
        "Pastikan pengairan cukup dan teratur, terutama pada masa pembungaan dan pengisian bulir.",
        "Gunakan mulsa untuk menjaga kelembapan tanah dan mengurangi gulma.",
        "Lakukan penyiraman di pagi atau sore hari untuk menghindari penguapan berlebih.",
        "Perhatikan tanda-tanda kekurangan air seperti daun menggulung atau menguning.",
      ],
      peralihan: [
        "Siapkan bibit yang tahan terhadap perubahan cuaca.",
        "Sesuaikan jadwal tanam dengan perkiraan cuaca.",
        "Perhatikan perubahan suhu yang bisa mempengaruhi pertumbuhan tanaman.",
        "Siapkan plastik atau pelindung jika terjadi hujan mendadak untuk melindungi padi yang sedang dijemur.",
      ],
    },
    jagung: {
      hujan: [
        "Tanam jagung di lahan yang drainasenya baik atau buat bedengan tinggi.",
        "Kurangi kepadatan tanaman untuk mengurangi kelembapan yang memicu penyakit jamur.",
        "Pantau kemungkinan penyakit bulai yang sering muncul saat musim hujan.",
        "Lakukan penyemprotan fungisida jika diperlukan sebelum hujan turun.",
      ],
      kemarau: [
        "Lakukan penyiraman secukupnya, terutama pada fase pembungaan dan pengisian biji.",
        "Gunakan mulsa untuk menjaga kelembapan tanah dan mengurangi gulma.",
        "Pilih varietas jagung yang tahan kekeringan jika menanam di musim kemarau panjang.",
        "Perhatikan jarak tanam yang tepat agar akar bisa menjangkau air di tanah lebih dalam.",
      ],
      peralihan: [
        "Perhatikan perkiraan cuaca sebelum melakukan penanaman.",
        "Siapkan sistem pengairan yang mudah disesuaikan dengan kondisi cuaca.",
        "Pilih varietas yang adaptif terhadap perubahan cuaca.",
        "Siapkan pelindung tanaman untuk mengantisipasi cuaca ekstrem.",
      ],
    },
  };

  const selectedAdvice = adviceData[selectedCrop][currentSeason];

  return (
    <Card className="w-full max-w-md mx-auto p-4 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Tips Merawat {selectedCrop === 'padi' ? 'Padi' : 'Jagung'} di Musim {' '}
        {currentSeason === 'hujan' ? 'Hujan' : 
         currentSeason === 'kemarau' ? 'Kemarau' : 'Peralihan'}
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        {selectedAdvice.map((advice, index) => (
          <li key={index} className="text-gray-700">{advice}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AdviceSection;
