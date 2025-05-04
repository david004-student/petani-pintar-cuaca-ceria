
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useWeather } from './WeatherContext';

interface QuestionFormProps {
  selectedCrop: 'padi' | 'jagung' | null;
}

interface AnswerData {
  padi: {
    hujan: Record<string, string>;
    kemarau: Record<string, string>;
    peralihan: Record<string, string>;
  };
  jagung: {
    hujan: Record<string, string>;
    kemarau: Record<string, string>;
    peralihan: Record<string, string>;
  };
}

const QuestionForm: React.FC<QuestionFormProps> = ({ selectedCrop }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const { currentSeason } = useWeather();

  // Database sederhana untuk pertanyaan umum
  const answerDatabase: AnswerData = {
    padi: {
      hujan: {
        "hama": "Untuk mengatasi hama di musim hujan, perhatikan wereng dan keong mas. Gunakan pestisida alami seperti ekstrak daun nimba atau gunakan musuh alami seperti bebek untuk memakan keong.",
        "pupuk": "Di musim hujan, kurangi pupuk nitrogen dan tambah pupuk kalium. Berikan pupuk saat cuaca cerah agar tidak hanyut terbawa air.",
        "irigasi": "Pastikan saluran pembuangan lancar agar air tidak menggenang. Air yang menggenang terlalu lama bisa membuat akar padi busuk.",
        "bibit": "Pilih bibit yang tahan terhadap penyakit blast yang sering muncul saat musim hujan. Juga pilih yang tahan rebah karena angin kencang.",
        "panen": "Panen saat cuaca cerah dan segera keringkan gabah untuk menghindari tumbuhnya jamur. Gunakan terpal sebagai alas jemur dan siapkan tempat teduh jika tiba-tiba hujan."
      },
      kemarau: {
        "hama": "Di musim kemarau, tikus dan penggerek batang lebih sering menyerang. Jaga kebersihan pematang dan gunakan perangkap tikus.",
        "pupuk": "Berikan pupuk secara tepat waktu dan dosis. Tambahkan pupuk organik untuk membantu tanah menyimpan air lebih lama.",
        "irigasi": "Atur jadwal pengairan dengan baik. Prioritaskan pengairan saat fase pembungaan dan pengisian bulir.",
        "bibit": "Pilih varietas yang tahan kekeringan dan berumur pendek, seperti Inpari atau Ciherang.",
        "panen": "Keringkan gabah dengan baik memanfaatkan terik matahari yang kuat. Hasil penjemuran biasanya lebih cepat dan kualitas lebih baik."
      },
      peralihan: {
        "hama": "Waspadai berbagai jenis hama karena perubahan cuaca. Lakukan pemantauan rutin dan pengendalian sejak dini.",
        "pupuk": "Sesuaikan pemberian pupuk dengan kondisi cuaca. Simpan pupuk di tempat kering untuk menghindari penggumpalan.",
        "irigasi": "Siapkan sistem pengairan yang fleksibel untuk mengantisipasi perubahan cuaca mendadak.",
        "bibit": "Pilih varietas yang adaptif terhadap perubahan cuaca, seperti Inpari yang memiliki ketahanan baik terhadap berbagai kondisi.",
        "panen": "Pantau prakiraan cuaca sebelum panen untuk menghindari kehilangan hasil akibat hujan mendadak."
      }
    },
    jagung: {
      hujan: {
        "hama": "Ulat grayak dan penggerek tongkol sering menyerang saat musim hujan. Gunakan pestisida secara tepat atau predator alami.",
        "pupuk": "Berikan pupuk saat cuaca tidak hujan agar tidak tercuci. Tambahkan pupuk yang mengandung kalsium untuk penguatan batang.",
        "irigasi": "Pastikan drainase lahan baik untuk mencegah genangan air yang bisa membuat akar busuk.",
        "bibit": "Pilih bibit yang tahan penyakit bulai yang sering muncul saat kelembapan tinggi.",
        "panen": "Panen saat cuaca cerah dan segera keringkan untuk menghindari tumbuhnya jamur pada tongkol jagung."
      },
      kemarau: {
        "hama": "Kutu daun dan tungau lebih banyak muncul saat kemarau. Semprotkan air pada daun untuk mengurangi serangan.",
        "pupuk": "Tambahkan pupuk organik untuk menjaga kelembapan tanah dan nutrisi. Pupuk berimbang NPK sangat dibutuhkan.",
        "irigasi": "Siram jagung secara teratur, terutama saat fase pembungaan dan pengisian biji.",
        "bibit": "Gunakan varietas tahan kekeringan seperti BISI atau Pioneer yang telah teruji.",
        "panen": "Hasil jagung biasanya lebih baik jika ditanam di awal musim kemarau dengan pengairan yang cukup."
      },
      peralihan: {
        "hama": "Berbagai jenis hama mungkin muncul. Lakukan pemantauan rutin dan pengendalian dini.",
        "pupuk": "Sesuaikan pemberian pupuk dengan kondisi tanah dan cuaca. Hindari pemupukan saat akan turun hujan lebat.",
        "irigasi": "Siapkan sistem pengairan yang bisa disesuaikan dengan cepat mengikuti perubahan cuaca.",
        "bibit": "Pilih varietas yang adaptif terhadap perubahan seperti NK atau Pioneer yang memiliki daya adaptasi baik.",
        "panen": "Perhatikan prakiraan cuaca dan lakukan panen saat kondisi optimal untuk mendapatkan hasil terbaik."
      }
    }
  };

  // Function to handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !selectedCrop) {
      toast.error("Mohon masukkan pertanyaan terlebih dahulu");
      return;
    }

    // Logika sederhana untuk mencocokkan kata kunci
    const questionLower = question.toLowerCase();
    let foundAnswer = null;

    // Cek kata kunci umum
    const keywords = ["hama", "pupuk", "irigasi", "air", "bibit", "panen"];
    
    for (const keyword of keywords) {
      if (questionLower.includes(keyword)) {
        if (keyword === "air") {
          foundAnswer = answerDatabase[selectedCrop][currentSeason]["irigasi"];
        } else {
          foundAnswer = answerDatabase[selectedCrop][currentSeason][keyword];
        }
        
        if (foundAnswer) break;
      }
    }

    // Jawaban default jika tidak ada yang cocok
    if (!foundAnswer) {
      foundAnswer = `Untuk tanaman ${selectedCrop === 'padi' ? 'padi' : 'jagung'} di musim ${currentSeason}, kami sarankan untuk selalu memperhatikan kondisi tanaman dan cuaca. Silakan bertanya lebih spesifik tentang hama, pupuk, irigasi, bibit, atau panen.`;
    }

    setAnswer(foundAnswer);
    toast.success("Pertanyaan diterima!");
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Tanya Petani Pintar</h2>
      
      {/* Question Form */}
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder={`Tanya tentang cara merawat ${selectedCrop === 'padi' ? 'padi' : selectedCrop === 'jagung' ? 'jagung' : 'tanaman'} di musim ${currentSeason}...`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
          disabled={!selectedCrop}
        />
        <Button 
          type="submit" 
          className="w-full bg-farm-green hover:bg-farm-green-dark"
          disabled={!selectedCrop || !question.trim()}
        >
          Kirim Pertanyaan
        </Button>
      </form>

      {answer && (
        <div className="mt-6 p-4 bg-farm-earth-light rounded-lg">
          <h3 className="font-semibold text-farm-earth-dark mb-2">Jawaban:</h3>
          <div className="text-gray-700">
            {answer}
          </div>
        </div>
      )}
    </Card>
  );
};

export default QuestionForm;
