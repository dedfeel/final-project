import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Foot from '../components/Foot'
import DoctorAI from '../assets/AIDoctor.png';
import axios from 'axios';

export default function BizTuraly() {
  
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
          <section className='bizturaly'>
            <div className='kenes-div1'>
              <div >
                <div className='biz-text' style={{display: 'flex', flexDirection: "column", gap: "10px", margin: "1% "}}>
                  <h1>Біз туралы</h1>
                  <p>Densaulyq.AI — бұл жасанды интеллект негізіндегі жүйе, ол пайдаланушы енгізген симптомдарға байланысты алғашқы ақпараттық кеңес береді. Жоба медициналық көмек көрсету мақсатында емес, тек анықтамалық сипаттағы деректермен қамтамасыз ету үшін құрылған.</p>
                </div> 
                <div className='biz-text' style={{display: 'flex', flexDirection: "column", gap: "10px", margin: "1% "}}>
                  <h1>Мақсатымыз</h1>
                  <p>Пайдаланушыларға өз симптомдарына қатысты жалпы ақпарат ұсынып, медициналық ұйымдарға жүгіну қажеттілігі туралы хабардар ету.</p>
                </div> 
                <div className='biz-text' style={{display: 'flex', flexDirection: "column", gap: "10px", margin: "1% "}}>
                  <h1>Қолдану тәртібі</h1>
                  <ul style={{marginLeft: "2%"}}>
                    <li>Бұл ресурс диагноз қоймайды және емдеу тәсілдерін ұсынбайды.</li>
                    <li>Жасанды интеллект жүйесі тек анықтамалық сипаттағы ақпарат береді.</li>
                    <li>Қандай да бір медициналық шешім қабылдамас бұрын, білікті дәрігермен кеңесу міндетті.</li>
                  </ul>
                </div> 
                <div className='biz-text' style={{display: 'flex', flexDirection: "column", gap: "10px", margin: "1% "}}>
                  <h1>Құқықтар мен жауапкершілік</h1>
                  <ul style={{marginLeft: "2%"}}>
                    <li>Сайт әкімшілігі ұсынылған ақпараттың негізінде қабылданған шешімдер үшін жауапкершілік көтермейді.</li>
                    <li>Бұл платформа медициналық қызмет көрсету құралы емес.</li>
                    <li>Пайдаланушы сайтты жеке жауапкершілікпен пайдаланады.</li>
                  </ul>
                </div> 
                <div className='biz-text' style={{display: 'flex', flexDirection: "column", gap: "10px", margin: "1% "}}>
                  <h1>Бізбен байланыс</h1>
                  <ul style={{marginLeft: "2%"}}>
                    <li>8 705 767 34 35</li>
                    <li>Telegram: @azzi_xxy</li>
                  </ul>
                </div> 
                <div className="image-container">
                  <img className='biz-img' style={{ transform: `translateY(${position}px)` }} src={DoctorAI} alt="" />
                  <div className="biz-shadow"></div>
                </div>
              </div>
              
            </div>  
          </section>
           
        <Foot/>
    </div>
  )
}
