import React, {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import axios from 'axios';

function HeroSection() {
  let navigate = useNavigate();
  const[gr, setGR] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
const pageOpen = (id) => {
  let path = '/viewerGR/' + id;
  navigate(path)
}

  useEffect(() => {
    async function getGR() {
      axiosInstance.get(`/get/latestgr`).then((res) => {console.log(res.data); setGR(res.data)}).catch(err => console.log(err));
    }
    getGR();
  }, [])

  const [width, setWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 800) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [width]);

 
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-2.mp4' autoPlay loop muted /> */}
      {/* <img src='/images/160.jpg' alt='47' /> */}
      <div className="element1"> <h1 className='homePage'>Maha TP Consultant</h1>
      <p>Maharashtra Town Planning Consultant</p></div>
     
     {visible && <div className="element2" id="elementToHide">
      <h1 >Latest GR</h1>
      { gr?gr.map((gr) => {
        return <div className="gr">
          <p onClick={() => pageOpen(gr._id)}>• {gr.name}</p>
        </div>
      }):null
     }
    </div>
}

     
      {/* <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Read Book
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
    </div>
  );
}

export default HeroSection;
