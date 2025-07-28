import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Foot from '../components/Foot';

export default function Kiru() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try{

        let response = await axios.post('http://localhost:8888/api/login', formData)

        console.log(response.data);

        localStorage.setItem('token', response.data.token)

        
        
        navigate('/')

    }catch(err){
        console.error(err.message);
    }
  }

  
  return (
    <>
      <div className="tirkelu-section">
        <a href="/" className='logoInTirkelu' style={{marginTop: "5%", marginBottom: '2%'}}>Densaulyq.AI</a>
        <div className='tirkelu-box'>

          <h1 className="tirkeluText1">Кіру</h1>
          <form className="kiru-form" onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
              <span>Электрондық пошта</span>
              <input
                type="email"
                placeholder="Электрондық поштанызды енгізіңіз"
                className="kiru-input-box"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span>Құпия сөз</span>
              <input
                type="password"
                placeholder="Құпия сөз енгізіңіз"
                className="kiru-input-box"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button
              type="submit"
              className="kiruBTN"
            >
              Кіру
            </button> 
          </form>
          <p style={{marginTop: '10px'}}>
            Аккаунтыңыз жоқ па? <Link to="/tirkelu" className="">Тіркелу</Link>
          </p>

        </div>

      </div>
    </>
  );
}