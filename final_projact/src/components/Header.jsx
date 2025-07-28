import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <a href="/" className='logo'>Densaulyq.AI</a>
        <div className="header-container">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a '}
          >
            <p className='header-text'>ЖИ дәрігері</p>
          </NavLink>
          <NavLink 
            to="/kenes" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a'}
          >
            <p className='header-text'>Онлайн кеңес</p>
          </NavLink>
          <NavLink 
            to="/kundelig" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a'}
          >
            <p className='header-text'>Денсаулық күнделігі</p>
          </NavLink>
          <NavLink 
            to="/bizturaly" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a'}
          >
            <p className='header-text'>Біз туралы</p>
          </NavLink>
          <NavLink 
            to="/seriktestik" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a'}
          >
            <p className='header-text'>Бізбен серіктестік</p>
          </NavLink>
          <NavLink 
            to="/tirkelu" 
            className='tirkelu'
          >
            <p>Тіркелу/Кіру</p>
          </NavLink>
        </div>

    </div>
  )
}
