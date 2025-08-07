import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Foot from '../components/Foot'
import { useNavigate } from 'react-router-dom'


export default function Profile() {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)

  let navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('https://densaulyq-backend.onrender.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data.userData)
        setFormData(res.data.userData)
      } catch (err) {
        setError('Профильді алу мүмкін болмады!')
        console.error(err)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/kiru') 
  }

  const handleDelete = async () => {

    try {
      const token = localStorage.getItem('token')
      await axios.delete('https://densaulyq-backend.onrender.com/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      localStorage.removeItem('token')
      navigate('/')
    } catch (err) {
      console.error('Аккаунтты өшіру қатесі:', err)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put('https://densaulyq-backend.onrender.com/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(formData)
      setEditMode(false)
    } catch (err) {
      console.error('Жаңарту қатесі:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (error) return <p>{error}</p>
  if (!user) return <p>Жүктелуде...</p>

  return (
    <div>
      <Header />
      <div className='profile-section'>
        <h2 className='profile-text'>Профиль</h2>
        <div className='profile-content'>
          {['username', 'surname', 'birth_date', 'gender', 'phonenumber', 'email'].map((key) => (
            <div className='profile-item' key={key}>
              <p className='profile-label'>
                <b>{key === 'username' ? 'Атыңыз' :
                    key === 'surname' ? 'Тегіңіз' :
                    key === 'birth_date' ? 'Туылған күніңіз' :
                    key === 'gender' ? 'Жынысыңыз' :
                    key === 'phonenumber' ? 'Телефон нөмеріңіз' :
                    'Email'}:</b>{' '}
                {editMode ? (
                  <input
                    type={key === 'birth_date' ? 'date' : 'text'}
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                  />
                ) : key === 'birth_date' ? (
                  new Date(user[key]).toLocaleDateString('kk-KZ')
                ) : (
                  user[key]
                )}
              </p>
            </div>
          ))}
        </div>

        <div className='ozgertu-section' style={{ marginTop: '20px' }}>
          {editMode ? (
            <button className='shygu' onClick={handleSave}>Сақтау</button>
          ) : (
            <button className='ozgerrtu' onClick={() => setEditMode(true)}>Өзгерту</button>
          )}
          <button className='shygu' onClick={handleLogout} style={{ marginLeft: '10px' }}>Шығу</button>
          <button className='oshiru' onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Аккаунтты өшіру</button>
        </div>
      </div>
      <Foot />
    </div>
  )
}
