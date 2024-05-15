import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/uploader.css'

const Uploader = () => {
  let navigate = useNavigate();
  const [info, setInfo] = useState({ name: null,number:null, index: null })
  const [pdf,setPDF] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message,setMessage] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setPDF(file);
    setPdfFile(url);
  };

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value })
  }


  async function handleSubmit () {
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("document", pdf);
    formData.append('chapterNO',info.number);
    formData.append("title", info.name);
    formData.append('index', [info.index]);


    await fetch(`${process.env.REACT_APP_API_URL}/drive/upload`, {
      method: 'POST',
      body: formData,
    })
    .then((res) => setMessage('Success'))
    .catch((err) => (setMessage(err.message)));

  }
  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
    <form className='react-form'>
      <h1>Upload Chapter File</h1>

      <fieldset className='form-group'>
        <h4>Chapter number</h4>

        <input id='formName' className='form-input' name='number' type='number' value={info.number} required onChange={handleChange} />
      </fieldset>

      <fieldset className='form-group'>
        <h4>Chapter Name:</h4>

        <input id='formName' className='form-input' name='name' type='text' value={info.name} required onChange={handleChange} />
      </fieldset>

      <fieldset className='form-group'>
        <h4>Chapter Index:</h4>
          <textarea type="" id='formMessage' className='form-textarea' name='index' value={info.index} required onChange={handleChange} cols="30" rows="10"></textarea>
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

      <div className='form-group'>
        <input id='formButton' className='btn' type='submit' placeholder='Send message' onClick={()=>{handleSubmit();navigate('/admin/book')}} />
      </div>
    </form>
    </div>
  )

}

export default Uploader;