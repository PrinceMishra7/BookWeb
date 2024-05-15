import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/blog.css'


const ServiceView = () => {
    let id = useParams();
    const [blog, setBlog] = useState(null);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    useEffect(() => {
        async function getBlogList() {
            await axiosInstance.get('/sr/serviceData/' + id.id).then(res => { console.log(res.data); setBlog(res.data) });
        }
        getBlogList();
    }, []);

    const [info, setInfo] = useState({ name: null,email:null,phone:null, description: null})
    const[blogname, setBlogname] = useState();
    const [message,setMessage] = useState(null);
    
    let name, value;
  
    const handleChange = (e) => {
      name = e.target.name;
      value = e.target.value;
      setInfo({ ...info, [name]: value })
      setBlogname(blog.name);
      
    }
   

    const handleSubmit = async (e) => {
      e.preventDefault()
        console.log(info);
        
      await axiosInstance.post("/sr/servicecontact/"+id.id, {info, blogname})
      .then((res) => setMessage('Success'))
      .catch((err) => (setMessage(err.message)));
    }

    return (
        <div>
            {blog ?
                <div className='blogs-container'>

                    <h1 className='blogh1'>{blog.name}</h1>
                    <img className='slide-content' src={blog.images.url} />
                    <p className='para'>{blog.description}</p>

                </div> : null}

            <div>
                {message == null ? null : <div class="alert alert-warning" role="alert">
                    {message}
                </div>}
                <form className='react-form'>
                    <h1 className='blogh1'>Request for Consultation</h1>

                    <fieldset className='form-group'>
                        <h4>Name</h4>

                        <input id='formName' className='form-input' name='name' type='text' value={info.name} required onChange={handleChange} />
                    </fieldset>

                    <fieldset className='form-group'>
                        <h4>Email:</h4>

                        <input id='formName' className='form-input' name='email' type='email' value={info.email} required onChange={handleChange} />
                    </fieldset>

                    <fieldset className='form-group'>
                        <h4>number:</h4>

                        <input id='formName' className='form-input' name='phone' type='number' value={info.phone} required onChange={handleChange} />
                    </fieldset>

                    <fieldset className='form-group'>
                        <h4>What you would like to say?</h4>
                        <textarea type="" id='formMessage' className='form-textarea' name='description' value={info.description} required onChange={handleChange} cols="30" rows="10"></textarea>
                    </fieldset>

                    <div className='form-group'>
                        <input id='formButton' className='btn' type='submit' placeholder='Send message' onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>

    )

}

export default ServiceView;