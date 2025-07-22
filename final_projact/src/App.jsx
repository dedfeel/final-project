import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Doktor from './pages/Doktor'
import Kenes from './pages/Kenes'
import Kundelig from './pages/Kundelig'
import BizTuraly from './pages/BizTuraly'
import Seriktestik from './pages/Seriktestik'
import Profile from './pages/Profile'
import Qupia from './pages/Qupia'
import Aqparat from './pages/Aqparat'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Doktor/>}/>
          <Route path='/kenes' element={<Kenes/>}/>
          <Route path='/kundelig' element={<Kundelig/>}/>
          <Route path='/bizturaly' element={<BizTuraly/>}/>
          <Route path='/seriktestik' element={<Seriktestik/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/qupia' element={<Qupia/>}/>
          <Route path='/aqparat' element={<Aqparat/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
