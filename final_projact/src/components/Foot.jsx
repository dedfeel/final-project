import React from 'react'
import { Link } from 'react-router-dom'


export default function Foot() {
  return (
    <div className='footer'>
          <div>
            <a href="#" className='foot-logo'>Densaulyq.AI</a>
            <p className='footer-text'>Сіздің денсаулығыңыз – біздің басты назарымыз.</p>
          </div>
          <div>
            <h1>Денсаулық сақтау</h1>
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
          <div>
            <h1>Компания</h1>
            <Link className='foot-nav' to="/bizturaly">
              Біз туралы
            </Link>
            <Link className='foot-nav' to="/seriktestik">
              Бізбен серіктестік
            </Link>
            <h3>Бізбен байланыс</h3>
          </div>
          <div>
            <h1>Құқықтық ақпарат</h1>
            <Link className='foot-nav' to="/aqparat">
              Пайдалану ережелері
            </Link>
            <Link className='foot-nav' to="/qupia">
              Құпиялылық саясаты
            </Link>


          </div>
    </div>
    
  )
}
