import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'

function romanize(num) {
    if(num<0){
       if(num==-2) return "I";
       else if(num==-1) return "II";
       else return Math.abs(num);
       
    }
    else{
        return num;
    }
  }
  
const Chapters = () => {
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
        let path = '/viewer/' + id;
        navigate(path)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        async function getChapters() {
            await axiosInstance.get("/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])
    const sortedChapters = chapters.sort((a, b) => {
        return a.chapterNo - b.chapterNo;
      });


    return (
        <div className="container">
            <div className="wrapper">
                <div className="accordion ">
                    {sortedChapters.map((chp, idx) => {
                        return <div className="item">
                            <div className="title">

                                <h2 onClick={() => toogle(idx)}>{romanize(chp.chapterNo)}</h2>
                                <h2 onClick={() => toogle(idx)}>{chp.name}</h2>
                                <span onClick={() => toogle(idx)}>{selected == idx ? "-" : "+"}</span>
                            </div>
                            <div className={selected == idx ? 'content show' : "content"}>
                                <div className='reading'>  <button className="seeMore" onClick={() => pageOpen(chp.id)}>Read this Chapter</button></div>
                               
                            {chp.chapterIndex.map((chpIdx, idx) => {
                                return <p className='indexes'> {chpIdx}</p>
                            })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Chapters