import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'
const Book = () => {
    let navigate = useNavigate();
    const [chapters, setChapter] = useState([]);
    const [selected, setSelected] = useState(null);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const toogle = (id) => {
        if (selected === id) {
            return setSelected(null);
        }
        setSelected(id);
    }
    const pageOpen = (id) => {
        let path = '/admin/editbook/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function getChapters() {
            await axiosInstance.get("/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])

  return (
    <div>
        <div className='container'>
            <div className="btn" onClick={()=>navigate('/admin/newbook')}>

                  
                        <p className="card-text">Upload a New Chapter</p>
                    
            </div>
        </div>
        <div className="container">
            <div className="wrapper">
                <div className="accordion ">
                    {chapters.map((chp, idx) => {
                        return <div className="item">

                            <div className="title" onClick={() => pageOpen(chp.id)}>

                                <h2 onClick={() => toogle(idx)}>{chp.chapterNo}</h2>
                                <h2 onClick={() => toogle(idx)}>{chp.name}</h2>
                                <span onClick={() => toogle(idx)}>Update</span>
                            </div>
                            <div className={selected == idx ? 'content show' : "content"}><button className="seeMore" >Update this Chapter</button>
                            {chp.chapterIndex.map((chpIdx, idx) => {
                                return <div>
                                    {chpIdx}
                                </div>
                            })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Book