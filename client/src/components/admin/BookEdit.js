import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import '../../css/uploader.css'

const BookEdit = () => {
  let id = useParams();
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [info, setInfo] = useState({ name: null,number:null, index: [] })
  const [pdf, setPDF] = useState(null);
  const [pdfid, setpdfid] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setPDF(file);
    setPdfFile(url);
  };
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value })
  }

  async function handleSubmit () {
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("documente", pdf);
    formData.append('chapterNO', info.number);
    formData.append("title", info.name);
    formData.append('index', [info.index]);
    formData.append('pdfId', pdfid);


    await fetch(`${process.env.REACT_APP_API_URL}/drive/updateChapter/` + id.id, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {setMessage('Success')})
      .catch((err) => {setMessage(err.message)});
  }

  async function handleDelete() {
    console.log(id)
    await axiosInstance.delete('/drive/deleteChapter/' + id.id)
      .then((res) => {setMessage('Success')})
      .catch((err) => {setMessage(err.message)});
  }
  useEffect(() => {
  
    async function getDetails() {
      await axiosInstance.get('/get/ChapterData/' + id.id).then(res => {
        setInfo({ name: res.data.name, number: res.data.chapterNo,index: res.data.chapterIndex });
        setpdfid(res.data.pdfId);
      }).catch(err => console.log(err))
    }
    getDetails();
  }, [])

  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
      <form className='react-form'>
        <h1>Update Chapter File</h1>

        <fieldset className='form-group'>
          <h4>Chapter number</h4>

          <input id='formName' className='form-input' name='number' type='number' defaultValue={info.number} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Chapter Name:</h4>

          <input id='formName' className='form-input' name='name' type='text' defaultValue={info.name} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Chapter Index:</h4>
          <textarea type="" id='formMessage' className='form-textarea' name='index' defaultValue={info.index} required onChange={handleChange} cols="30" rows="10"></textarea>
        </fieldset>

        <div>
          <input
            type="file"
            accept="application/pdf"
            placeholder="insert PDF here"
            onChange={(e) => handleFile(e)}
          />
          {pdfFile != null ? <div><iframe src={pdfFile} width='100%' height={window.innerHeight}></iframe></div> : null}
        </div>

        <div className='form-group row'>
          <input id='formButton' className='btn col' type='submit' value={"Update"} placeholder='Send message' onClick={()=>{handleSubmit();navigate('/admin/book');}} />
          <input id='formButton' className='btn col' type='button' value={"Delete"} placeholder='Delete' onClick={()=>{handleDelete();navigate('/admin/book');}} />
        </div>
      </form>
    </div>
  )

}

export default BookEdit;