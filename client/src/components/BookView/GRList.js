import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/search.css'
import '../../css/table.css'
import axios from 'axios';
const GRList = () => {
  let navigate = useNavigate();
  const [chapters, setChapter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const pageOpen = (id) => {
    let path = '/viewerGR/' + id;
    navigate(path)
  }

  useEffect(() => {
    async function getChapters() {
      await axios.get(`${process.env.REACT_APP_API_URL}/gr/allgrID`).then((res) => { console.log(res.data); setChapter(res.data.files) }).catch(err => console.log(err));
    }
    getChapters();
  }, [])
  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="search">
            <input type="text"
              className="searchText"
              placeholder='Search'
              onChange={(e) => { setSearchTerm(e.target.value) }} />
            <button class="searchButton"><i class="fa fa-search"></i></button>
          </div>
          <table>

            {/* <thead>
              <tr>
                <th scope="col">Name</th>
              </tr>
            </thead> */}
            <tbody>
              {chapters.filter((val) => {
                if (searchTerm == "") {
                  return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              }).map((chp, idx) => {
                return <tr>
                  <td data-label="Name"  onClick={() => pageOpen(chp.id)}>{chp.name}</td>
                </tr>
              })}

              
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default GRList