import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/Cards.css';
import CardItem from '../../css/CardItem';
import axios from 'axios'

const Dashboard = () => {
    let navigate = useNavigate();

    useEffect(() => {
      let token = localStorage.getItem('token');
      async function authenticate(){
        if(token==null){
          navigate('/admin/login')
        }
        await axios.get('/auth/authenticate', { headers: { Authorization: token } }).then(res => {
          console.log(res)
          if (res.status != 200){
            navigate('/admin/login')
          }}).catch(err=>console.log(err));
      }
      authenticate();
    }, [])
    
    return (
        <div className='cards'>
      <h1>Admin DashBoard</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/2.png'
              text='Update your Book with the latest changes'
              label='Book'
              path='/admin/book'
            />
            <CardItem
              src='/images/1.png'
              text='update your GR with the latest changes'
              label='GR'
              path='/admin/gr'
            />
            <CardItem
              src='/images/1.png'
              text='Services'
              label='SERVICES'
              path='/admin/services'
            />
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Dashboard