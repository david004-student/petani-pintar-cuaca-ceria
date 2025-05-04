import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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

// Interface for pest and fertilizer data
interface PestFertilizerData {
  title: string;
  description: string;
  imageUrl: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ selectedCrop }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Database untuk hama dan pupuk
  const pestFertilizerDatabase: Record<'padi' | 'jagung', Record<'hama' | 'pupuk', PestFertilizerData[]>> = {
    padi: {
      hama: [
        {
          title: 'Wereng Coklat',
          description: 'Serangga kecil yang menghisap cairan tanaman padi, menyebabkan daun menguning dan mengering.',
          imageUrl: 'https://images.unsplash.com/photo-1584005613293-33427c19c5a3?q=80&w=1000&auto=format&fit=crop'
        },
        {
          title: 'Penggerek Batang',
          description: 'Larva yang masuk ke dalam batang padi dan memakan bagian dalam, membuat batang mudah patah.',
          imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000&auto=format&fit=crop'
        },
        {
          title: 'Walang Sangit',
          description: 'Serangga berbau yang menghisap cairan bulir padi yang sedang mengisi, menyebabkan bulir hampa.',
          imageUrl: 'https://images.unsplash.com/photo-1585132862480-410c692c9341?q=80&w=1000&auto=format&fit=crop'
        }
      ],
      pupuk: [
        {
          title: 'Pupuk Urea',
          description: 'Pupuk dengan kandungan nitrogen tinggi, baik untuk pertumbuhan daun padi.',
          imageUrl: 'https://images.unsplash.com/photo-1506543730435-beb7fc7023d8?q=80&w=1000&auto=format&fit=crop'
        },
        {
          title: 'Pupuk Kompos',
          description: 'Pupuk organik yang meningkatkan kesuburan tanah dan daya tahan tanaman padi.',
          imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop'
        },
        {
          title: 'Pupuk TSP',
          description: 'Pupuk dengan kandungan fosfor tinggi, baik untuk pembentukan akar dan pertumbuhan malai padi.',
          imageUrl: 'https://images.unsplash.com/photo-1537105935666-5a31bdf56fef?q=80&w=1000&auto=format&fit=crop'
        }
      ]
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

    // Check if question is related to search
    const searchTerms = ["cari", "carikan", "informasi", "info", "tentang", "apa itu"];
    let isSearchQuestion = false;
    let searchCategory: 'hama' | 'pupuk' | null = null;
    let searchKeyword = '';
    
    for (const term of searchTerms) {
      if (question.toLowerCase().includes(term)) {
        isSearchQuestion = true;
        
        if (question.toLowerCase().includes("hama")) {
          searchCategory = 'hama';
        } else if (question.toLowerCase().includes("pupuk")) {
          searchCategory = 'pupuk';
        }
        
        // Extract search keyword - look for specific pest or fertilizer name
        const qLower = question.toLowerCase();
        const database = selectedCrop ? pestFertilizerDatabase[selectedCrop] : null;
        
        if (database && searchCategory) {
          for (const item of database[searchCategory]) {
            if (qLower.includes(item.title.toLowerCase())) {
              searchKeyword = item.title;
              break;
            }
          }
        }
        
        break;
      }
    }
    
    if (isSearchQuestion && selectedCrop && searchCategory) {
      // Handle search-type questions
      const database = pestFertilizerDatabase[selectedCrop][searchCategory];
      
      if (searchKeyword) {
        // Search for specific item
        const foundItem = database.find(
          item => item.title.toLowerCase() === searchKeyword.toLowerCase()
        );
        
        if (foundItem) {
          setAnswer(`<div class="search-result">
            <h4>${foundItem.title}</h4>
            <p>${foundItem.description}</p>
            <div class="mt-2">
              <img src="${foundItem.imageUrl}" alt="${foundItem.title}" class="w-full h-32 object-cover rounded-md" />
            </div>
          </div>`);
          setSearchTerm('');
        } else {
          setAnswer(`Maaf, saya tidak menemukan informasi spesifik tentang ${searchKeyword} untuk tanaman ${selectedCrop}.`);
        }
      } else {
        // Show category items
        const categoryItems = database.map(item => 
          `<div class="search-result mb-3">
            <h4 class="font-bold">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
            <div class="mt-2">
              <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-24 object-cover rounded-md" />
            </div>
          </div>`
        ).join('');
        
        setAnswer(`<div>
          <h3 class="font-bold mb-2">Informasi ${searchCategory === 'hama' ? 'Hama' : 'Pupuk'} untuk ${selectedCrop === 'padi' ? 'Padi' : 'Jagung'}:</h3>
          ${categoryItems}
        </div>`);
      }
    } else {
      // Existing question-answer logic
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
    }

    toast.success("Pertanyaan diterima!");
  };

  // Function to handle search
  const handleSearch = () => {
    if (!selectedCrop || !searchTerm.trim()) {
      toast.error("Mohon pilih tanaman dan masukkan kata kunci pencarian");
      return;
    }

    // Search in both hama and pupuk
    let results = [];
    let resultType: 'hama' | 'pupuk' | null = null;
    
    // Search in hama
    const hamaResults = pestFertilizerDatabase[selectedCrop].hama.filter(
      item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (hamaResults.length > 0) {
      results = hamaResults;
      resultType = 'hama';
    }
    
    // If no results in hama, search in pupuk
    if (results.length === 0) {
      const pupukResults = pestFertilizerDatabase[selectedCrop].pupuk.filter(
        item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (pupukResults.length > 0) {
        results = pupukResults;
        resultType = 'pupuk';
      }
    }
    
    if (results.length > 0) {
      const resultItems = results.map(item => 
        `<div class="search-result mb-3">
          <h4 class="font-bold">${item.title}</h4>
          <p class="text-sm">${item.description}</p>
          <div class="mt-2">
            <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-24 object-cover rounded-md" />
          </div>
        </div>`
      ).join('');
      
      setAnswer(`<div>
        <h3 class="font-bold mb-2">Hasil pencarian untuk "${searchTerm}" (${resultType === 'hama' ? 'Hama' : 'Pupuk'}):</h3>
        ${resultItems}
      </div>`);
    } else {
      setAnswer(`Maaf, saya tidak menemukan informasi tentang "${searchTerm}" untuk tanaman ${selectedCrop === 'padi' ? 'padi' : 'jagung'}.`);
    }
    
    toast.success("Pencarian selesai!");
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Tanya Petani Pintar</h2>
      
      {/* Search Bar */}
      <div className="mb-4 flex gap-2">
        <Input
          placeholder={`Cari info hama atau pupuk...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
          disabled={!selectedCrop}
        />
        <Button 
          onClick={handleSearch}
          className="bg-farm-green hover:bg-farm-green-dark"
          disabled={!selectedCrop || !searchTerm.trim()}
        >
          <Search className="h-4 w-4 mr-2" />
          Cari
        </Button>
      </div>
      
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
          <div 
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      )}
    </Card>
  );
};

export default QuestionForm;
