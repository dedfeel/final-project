import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Tirkelu() {
    let navigate = useNavigate()

    let [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        surname: '',
        birth_date:'',
        gender: '',
        phonenumber: '',
        email: '',
        password: '',
    });



  
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData);
    if(formData.password == confirmPassword){
      try{
        let response = await axios.post('https://densaulyq-backend.onrender.com/api/register', formData)
        console.log(response.data[0]);

        // if(response.rows.length > 0){

        // }
        navigate('/kiru')
      }catch(err){
        console.error(err.message);
      }
    }else{
      setError('Құпия сөздер сәйкес келмейді!')
    }
  } 


  return (
    <>
    <div>
      
      <div className='tirkelu-section'>
        <a href="/" className='logoInTirkelu'>Densaulyq.AI</a>
        

        <div className='tirkelu-box'>
          <h1 className='tirkeluText1'>Тіркелу</h1>
          <form className='tirkelu-form' onSubmit={handleSubmit}>
            <div className='user_details'>  
              <div>
                <span>Толық атыңыз</span> 
                <input  
                  type="text"
                  placeholder="Атыңызды енгізіңіз"
                  className='input-box'
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />

              </div>

              <div>
                <span>Толық тегіңіз</span>
                <input
                  type="text"
                  className='input-box'
                  placeholder="Тегіңізді енгізіңіз"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                  required
                />
              </div>
              <div>
                <span>Туылған күніңіз</span>
                <input
                    type="date"
                    className='input-box'
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                    required
                  />
              </div>  
              <div>
                <span>Жынысыңыз</span>
                <select 
                    name="gender"  
                    required
                    className='input-box gender'
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    placeholder="Жынысыңыз"
                  >
                    <option value="" disabled hidden>Жынысыңызды таңдаңыз</option>
                    <option value="Ер">Ер</option>
                    <option value="Әйел">Әйел</option>
                  </select>
              </div> 

              <div>
                <span>Телефон нөміріңіз</span>
                <input
                  type="text"
                  className='input-box'
                  placeholder="Телефон нөміріңізді енгізіңіз"
                  value={formData.phonenumber}
                  onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}
                  required
                />
              </div>  

              <div>
                <span>Электрондық пошта</span>
                <input
                  type="email"
                  className='input-box'
                  placeholder="Электрондық поштанызды енгізіңіз"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <span>Құпия сөз</span>
                 <input
                  type="password"
                  className='input-box'
                  placeholder="Құпия сөз енгізіңіз"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div>
                <span>Құпия сөзді қайталау</span>
                <input
                  type="password"
                  className='input-box'
                  placeholder="Құпия сөзді қайта теріңіз"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
              
              {error && 
                <div>
                  <p style={{color: "red"}}>{error}</p>
                </div>

              }

            
            
            <button className='tirkeluBTN' type="submit">
              Тіркелу
            </button>
          </form>
            
          <p style={{color: 'rgb(47, 61, 117)', fontSize: '0.8em'} }>
            Сізде аккаунт бар ма? <Link to="/kiru" className="">Кіру</Link>
          </p>
        </div>

        <div className='check-box'>

        </div>
      </div>
      
    </div>
    </>
  );
}