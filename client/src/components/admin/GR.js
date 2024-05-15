import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'
const GR = () => {
    let navigate = useNavigate();
    const [chapters, setChapter] = useState([]);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    const pageOpen = (id) => {
        let path = '/admin/editgr/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function getChapters() {
            await axiosInstance.get("/gr/allgrID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])

    return (
        <div>
           <div className='container'>
            <div className="btn" onClick={()=>navigate('/admin/newgr')}>

                  
                        <p className="card-text">Upload a New GR</p>
                    
            </div>
        </div>
            <div className="container">
                <div className="wrapper">
                    <div className="accordion ">
                        {chapters.map((chp, idx) => {
                            return <div className="item">
                                
                                <div className="title">
                                    <h2 > {idx+1}. </h2>
                                    <h2 >{chp.name}</h2>
                                    <button className="seeMore" onClick={() => pageOpen(chp.id)}>Update GR</button>
                                </div>

                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GR