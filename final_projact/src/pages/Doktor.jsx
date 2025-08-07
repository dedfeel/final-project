import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import DoctorAI from '../assets/AIDoctor.png'
import Foot from '../components/Foot'
import axios from 'axios'
import '../index.css'

let apiKey = import.meta.env.VITE_GEMINI_API_KEY

export default function Doktor() {
    let [conversation, setConversation] = useState([])
    let [userInput, setUserInput] = useState('')
    let [error, setError] = useState('')
    let [isTyping, setIsTyping] = useState(false)
    const typingTimeoutRef = useRef(null)

    useEffect(() => {
        let savedConversation = sessionStorage.getItem('gemini_conversation')
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation))
        }
        
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
        }
    }, [])

    const handleClear = () => {
        setConversation([])
        sessionStorage.removeItem('gemini_conversation')
    }

    const typeWriterEffect = (text, index, callback) => {
        if (index < text.length) {
            const displayedText = text.substring(0, index + 1)
            callback(displayedText)
            typingTimeoutRef.current = setTimeout(() => {
                typeWriterEffect(text, index + 1, callback)
            }, 30) 
        } else {
            setIsTyping(false)
        }
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!userInput.trim()) return
            
            let updatedConversation = [...conversation, { 
                type: 'question', 
                text: userInput,
                displayedText: userInput 
            }]
            setConversation(updatedConversation)
            setUserInput('')
            
            let prompt = `Ешқандай абзац керек емес абзацты нүктемен жалғастыра берші.
                          Сен — медициналық емес кеңес беретін көмекші ботсың.
                          Сенің басты мақсатың — пайдаланушының белгілері бойынша ақпараттық сипатта алғашқы кеңес беру және сол белгілерге байланысты клиника жайлы мәлімет ұсыну.
                          Міндетті түрде мына талаптарды орында:
                          🔒 Қауіпсіздік талаптары:
                          Нақты диагноз немесе емдеу тәсілдерін ешқашан айтпа.
                          – Дәрі-дәрмек, емдеу курсы, инъекция, медициналық процедуралар ұсынуға тыйым салынған.
                          Тек анықтамалық сипаттағы ақпарат бер:
                          – Симптом қандай ауруға ұқсайтынын айт.
                          – Аурудың жұғу жолдары, белгілері, қауіптілігі, не істеу/не істемеу керектігі жайлы ақпарат бер.
                          – Бірақ емдеме және нақты нұсқаулық ұсынба.
                          Егер пайдаланушы ем сұраса немесе диагноз қойдыра бастаса, былай жауап бер:
                          "Кешіріңіз, мен нақты емдеу тәсілін ұсына алмаймын. Сізге дәрігерге көріну қажет."
                          Әрқашан мына ескертуді қос:
                          ⚠️ Назар аударыңыз: Бұл бот тек ақпараттық мақсатта алғашқы көмек ұсынады. Диагноз қоюға немесе ем-дом тағайындауға құқығы жоқ. Симптом күшейсе немесе күмән туындаса — дәрігерге жүгініңіз!
                          Менің мынадай симптомы бар: ['${userInput}']
                          Осы симптом бойынша:
                          Бұл симптом нақты қандай ауру болуы мүмкін, аурудың атауын жаз.
                          Сол ауру туралы нақты әрі қысқа медициналық ақпарат бер:
                          Қалай жұғады (жұғу жолдары)
                          Белгілері (симптомдары)
                          Аурудың қауіптілігі (қаншалықты қауіпті)
                          Не істеу керек / не істеуге болмайды`

            let response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    contents: [{ parts: [{ text: prompt }] }]
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )

            let answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text
            
            if (answer) {
                setIsTyping(true)
                updatedConversation = [...updatedConversation, { 
                    type: 'answer', 
                    text: answer,
                    displayedText: '' 
                }]
                setConversation(updatedConversation)
                
                typeWriterEffect(answer, 0, (displayedText) => {
                    setConversation(prev => {
                        const newConv = [...prev]
                        newConv[newConv.length - 1] = {
                            ...newConv[newConv.length - 1],
                            displayedText: displayedText
                        }
                        return newConv
                    })
                })
                
                sessionStorage.setItem('gemini_conversation', JSON.stringify(updatedConversation.map(item => ({
                    ...item,
                    displayedText: item.text 
                }))))
            }
        } catch (err) {
            setError(err.message)
            setUserInput('')
        }
    }
    
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
            <div className='display-element'></div>
            <section className='doktor'>
                <h1 className='doktor-text1'>Денсаулық – басты байлық. Біздің Densaulyq.AI – сіздің сенімді серігіңіз.</h1>

                <div className='doctor-div1'>
                    <div className='AI-otvet bot-message'>
                        <div className="image-container">
                          <img className=' floating-image' style={{ transform: `translateY(${position}px)` }} src={DoctorAI} alt="" />
                          <div className="shadow"></div>
                        </div>
                        <p className='speech-bubble'>Назар аударыңыз! Densaulyq.AI — бұл дәрігер емес және медициналық қызмет көрсетпейді. Біздің жасанды интеллект жүйеміз тек анықтамалық сипаттағы ақпарат ұсынады және диагноз қоюға, нақты емдеу тәсілін тағайындауға құқығы жоқ.
                        Біздің жауаптарымыз тек алғашқы ақпараттық көмек құралы ретінде ұсынылады және нақты медициналық шешімдерді қабылдау үшін міндетті түрде білікті дәрігерге жүгінуіңіз қажет.
                        Біздің жүйені пайдалану арқылы сіз осы ескертумен келісесіз және денсаулығыңызға қатысты барлық шешімді өз жауапкершілігіңізбен қабылдайтыныңызды түсінесіз.</p> 
                    </div>

                    {conversation.map((item, index) => (
                        item.type === 'question' ? (
                            <div key={index} className='AI-otvet user-message'>
                                <p className='send'>{item.displayedText || item.text}</p>
                            </div>
                        ) : (
                            <div key={index} className='AI-otvet bot-message'>
                                <div className="image-container">
                                  <img className=' floating-image' style={{ transform: `translateY(${position}px)` }} src={DoctorAI} alt="" />
                                  <div className="shadow"></div>
                                </div>
                                <p className='speech-bubble'>{item.displayedText || ''}</p>     
                                {isTyping && index === conversation.length - 1 && (
                                    <span className="typing-cursor">|</span>
                                )}
                            </div>
                        )
                    ))}
                </div>
                
                {error &&
                    <div className='error-message'>
                        Қате: {error}
                    </div>
                }
                
                <div className='message-controls'>
                    <form onSubmit={handleSubmit} className='message-form'>
                        <input
                            className='message-input'
                            type="text"
                            placeholder='Сұрағыңызды қойыңыз?'
                            onChange={(e) => setUserInput(e.target.value)}
                            value={userInput}
                            disabled={isTyping}
                        />
                        <button 
                            type='submit' 
                            className='send-button'
                            disabled={isTyping}
                        >
                            {isTyping ? 'Жауап жазылуда...' : 'Жіберу'}
                        </button>
                        <button 
                            onClick={handleClear} 
                            className='send-button'
                            disabled={isTyping}
                        >
                            Тазалау
                        </button>
                    </form>
                </div>
            </section>
            <Foot/>
        </div>
    )
}