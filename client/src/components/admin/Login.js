import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  let navigate = useNavigate();
  const [info, setInfo] = useState({ username: null, password: null })
  const [message, setMessage] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
  let name, value;

  const submitInfo = async () => {
    await axiosInstance.post('/auth/login', info).then(res => {setMessage(res.data.message);localStorage.setItem('token',res.data.token);if(res.data.success==true){navigate('/admin/dashboard')}}).catch(err => {setMessage(err.response.data.message);});
  }

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value })
  }

  useEffect(() => {
    let token = null;
    token = localStorage.getItem('token');
    if (token != null) {
      localStorage.clear();
    }
  }, [])

  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
      <form>
        <div class="form-outline mb-4">
          <input type="text" id="form2Example1" class="form-control" value={info.username} name='username' onChange={handleInput} />
          <label class="form-label" for="form2Example1">Username</label>
        </div>
        <div class="form-outline mb-4">
          <input type="password" id="form2Example2" class="form-control" value={info.password} name='password' onChange={handleInput} />
          <label class="form-label" for="form2Example2">Password</label>
        </div>
        <button type="button" class="btn btn-primary btn-block mb-4" onClick={submitInfo}>Sign in</button>
      </form>
    </div>
  )
}

export default Login