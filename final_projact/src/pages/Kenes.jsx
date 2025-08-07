import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Foot from '../components/Foot';
import DoctorAI from '../assets/AIDoctor.png';
import axios from 'axios';
import DefaultClinicImage from '../assets/default-clinic.png';

let apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function Kenes() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clinic, setClinic] = useState(null);


  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('https://densaulyq-backend.onrender.com/api/clinic');
        setClinics(response.data);
      } catch (error) {
        console.error('Клиникалар тізімін жүктеу сәтсіз болды', error);
      }
    };

    fetchClinics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userInput.trim()) return;
      
      setIsLoading(true);
      setClinic(null);
      
      const prompt = `Менің мынадай симптомы бар: ${userInput}. Маған ТЕК мынадай JSON объектісін қайтар:
      {
        "title": "Клиниканың атауы",
        "city": "Қала",
        "country": "Қазақстан",
        "website": "https://example.com",
        "imageUrl": "https://example.com/image.jpg",
        "description": "Клиника туралы қысқаша мәлімет",
        "symptom": "${userInput}"
      }
      ЕШҚАНДАЙ ҚОСЫМША ТЕКСТ ЖАЗБА! Тек JSON объектісі!`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const resultText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      try {
        const jsonStart = Math.max(resultText.indexOf('{'), 0);
        const jsonEnd = Math.max(resultText.lastIndexOf('}') + 1, 0);
        const jsonString = resultText.slice(jsonStart, jsonEnd);
        
        const parsedData = JSON.parse(jsonString);
        
        if (!parsedData.title || !parsedData.city) {
          throw new Error('API жауабында міндетті өрістер жоқ');
        }

        const validatedClinic = {
          title: parsedData.title || 'Атауы жоқ',
          city: parsedData.city || 'Қала көрсетілмеген',
          country: parsedData.country || 'Қазақстан',
          website: parsedData.website || '',
          imageUrl: parsedData.imageUrl || '',
          description: parsedData.description || 'Сипаттама жоқ',
          symptom: parsedData.symptom || userInput
        };
        setUserInput('')
        setClinic(validatedClinic);
      } catch (err) {
        setError('Парсинг қатесі:', err);
        throw new Error(`API жауабын өңдеу мүмкін емес: ${resultText.substring(0, 100)}...`);
      }

    } catch (err) {
      console.error('API сұрау қатесі:', err);
      setError(err.response?.data?.error?.message || err.message || 'Белгісіз қате');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setClinic(null);
    setUserInput('');
    setError('');
  };

  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        
        if (prev >= 10) {
          setDirection(-1);
          return 9;
        }
        if (prev <= -10) {
          setDirection(1);
          return -9;
        }
        return prev + direction;
      });
    }, 50); 

    return () => clearInterval(interval);
  }, [direction]);


   


  return (
    <div>
      <Header/>
      <section className='kenes'>


        <div className='clinic-section'>
          <h2 className='clinic-text'>Клиникалар тізімі</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {clinics.map((clinic) => (
              <div key={clinic.id} style={{
                border: '1px solid #ccc',
                padding: '15px',
                width: '300px',
                borderRadius: '30px',
                backgroundColor: ' rgb(47, 61, 117)',
                color: 'white'
              }}>
                <img
                  src={clinic.photo_url}
                  alt={clinic.name}
                  style={{ width: '100%', height: '290px', objectFit: 'cover', borderRadius: '20px' }}
                />
                <h1>{clinic.name}</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <p><strong>Мекен-жайы:</strong> {clinic.adres}</p>
                  <p><strong>Жұмыс уақыты:</strong> {clinic.jumys_uaqyty}</p>
                  <p><strong>Байланыс:</strong> {clinic.number_phone}</p>
                  <p><strong>Сипаттама:</strong> {clinic.discription}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>


        <div className='kenes-div1'>
          <div className="image-container">
            <img className=' floating-image' style={{ transform: `translateY(${position}px)` }} src={DoctorAI} alt="" />
            <div className="shadow"></div>
          </div>
          
          <p className='speech-bubble'>
            Бұл бөлімде сіз өзіңізге тән симптомды енгізу арқылы алдын ала ақпарат ала аласыз. Жасанды интеллект жүйесі сіз көрсеткен симптом негізінде:
            Симптомның ықтимал атауын анықтайды;
            Аталған симптомды диагностикалайтын және емдейтін клиникаларды ұсынады;
            Әрбір клиника бойынша келесі деректерді көрсетеді: орналасқан қаласы, нақты мекенжайы, ресми сайты, клиниканың фотосуреті, қызметінің сипаттамасы және ақылы немесе тегін екендігі.
            Ұсынылатын ақпарат тек анықтамалық сипатқа ие және медициналық диагноз немесе ем-шараны алмастырмайды.
            Денсаулығыңызға қатысты түпкілікті шешімді білікті медициналық маман қабылдауы тиіс.
            Біздің мақсатымыз – дұрыс бағыт-бағдар беру арқылы алғашқы ақпаратпен қамтамасыз ету.
          </p> 
        </div>  

        {clinic && (
          
          <div className='clinic-card'>
            <div className="image-container">
              <img className=' floating-image' style={{ transform: `translateY(${position}px)` }} src={DoctorAI} alt="" />
              <div className="shadow"></div>
            </div>
            <div className="cliniv-box speech-bubble">
              <img 
                className="clinic-image"
                src={clinic.imageUrl || DefaultClinicImage} 
                alt={clinic.title}
                onError={(e) => {
                  e.target.src = DefaultClinicImage;
                }}
              />


              <div className="clinic-info">
                <h2>Клиниканың атауы:{clinic.title}</h2>
                <p><strong>Симптом:</strong> {clinic.symptom}</p>
                <p><strong>Орналасқан жері:</strong> {clinic.city}, {clinic.country}</p>
                <p><strong>Сипаттама:</strong> {clinic.description}</p>

                {clinic.website && (
                  <p>
                    <strong>Сайт:</strong>{' '}
                    <a 
                      href={clinic.website.startsWith('http') ? clinic.website : `https://${clinic.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {clinic.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className='message-controls'>
          <form onSubmit={handleSubmit} className='message-form'>
            <input
              className='message-input'
              type="text"
              placeholder='Симптомды енгізіңіз'
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              disabled={isLoading}
            />
            <button 
              type='submit' 
              className='send-button'
              disabled={isLoading}
            >
              {isLoading ? 'Жүктелуде...' : 'Жіберу'}
            </button>
            <button 
              type='button'
              onClick={handleClear} 
              className='send-button'
            >
              Тазалау
            </button>
          </form>
        </div>

        {error && (
          <div className='error-message'>
            Қате:  API жауабын өңдеу мүмкін емес, {error}
           

          </div>
        )}

        
      </section>
      <Foot/>
    </div>
  );
}