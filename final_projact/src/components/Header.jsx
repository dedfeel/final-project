import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import account from '../assets/profile.png'

export default function Header() {
  let token = localStorage.getItem('token')
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
            to="/bizturaly" 
            className={({ isActive }) => isActive ? 'head-a active-link active-link-active' : 'head-a'}
          >
            <p className='header-text'>Біз туралы</p>
          </NavLink>

        {token ?
        (
          <NavLink 
            to="/profile"
          >
            <img className='profile-img' src={account} alt="" />
          </NavLink>
        ):
        (
          <NavLink 
            to="/tirkelu" 
            className='tirkelu'
          >
            <p>Тіркелу/Кіру</p>
          </NavLink>
        )}
          

          
        </div>

    </div>
  )
}
