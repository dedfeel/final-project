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
import Kiru from './pages/Kiru'
import Tirkelu from './pages/Tirkelu'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Doktor/>}/>
          <Route path='/bizturaly' element={<BizTuraly/>}/>
          <Route path='/seriktestik' element={<Seriktestik/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path='/kenes' element={<Kenes/>}/>
          <Route path='/kundelig' element={<Kundelig/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/qupia' element={<Qupia/>}/>
        </Route>
          
          
          <Route path='/aqparat' element={<Aqparat/>}/>
          <Route path='/kiru' element={<Kiru/>}/>
          <Route path='/tirkelu' element={<Tirkelu/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
