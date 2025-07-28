import React from 'react'
import { Link } from 'react-router-dom'


export default function Foot() {
  return (
    <div className='footer'>
      
          <div className='footer-container'>
            <Link to="/" className='foot-logo'>Densaulyq.AI</Link>
            <p className='footer-text'>Сіздің денсаулығыңыз – біздің басты назарымыз.</p>
          </div>
          <div className='foot-container'>
              <div className='container-box'>
                <h1 className='nav-text'>Денсаулық сақтау</h1>
                <Link className='foot-nav' to="/">
                  ЖИ дәрігері
                </Link>
                <Link className='foot-nav' to="/kenes">
                  Онлайн кеңес
                </Link>
                <Link className='foot-nav' to="/kundelig">
                  Денсаулық күнделігі
                 </Link>
              </div>
              <div className='container-box'>
                <h1 className='nav-text'>Компания</h1>
                  <Link className='foot-nav' to="/bizturaly">
                    Біз туралы
                  </Link>
                  <Link className='foot-nav' to="/seriktestik">
                    Бізбен серіктестік
                  </Link>
                  <h3 className='foot-nav'  >Бізбен байланыс</h3>
              </div>
              <div className='container-box'>
                <h1 className='nav-text'>Құқықтық ақпарат</h1>
                  <Link className='foot-nav' to="/aqparat">
                    Пайдалану ережелері
                  </Link>
                  <Link className='foot-nav' to="/qupia">
                    Құпиялылық саясаты
                  </Link>
              </div>

          </div>
          
    </div>
    
  )
}
