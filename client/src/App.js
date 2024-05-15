import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Fetch from './components/BookView/Fetch'
import Fetch2 from './components/BookView/FetchGR'
import Home from './components/Home';
import Navbar from './css/Navbar';
import Display from './components/BookView/Chapters'
import NewBook from './components/admin/NewBook'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard';
import Book from './components/admin/Book';
import BookEdit from './components/admin/BookEdit';
import GR from './components/admin/GR';
import GREdit from './components/admin/GREdit';
import NewGR from './components/admin/NewGR';
import GRList from './components/BookView/GRList'
import Service from './components/admin/Services'
import ServiceEdit from './components/admin/ServicesEdit'
import NewService from './components/admin/NewServices'
import ServicesList from './components/ServicesList';
import ServiceView from './components/serviceBlog';
import Contactus from './components/Contactus';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ScrollToTop/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/book' element={<Display/>}/>
    <Route path='/viewer/:id' element={<Fetch/>}/>
    <Route path='/viewerGR/:id' element={<Fetch2/>}/>
    <Route path='/admin/newbook' element={<NewBook/>}/>
    <Route path='/admin/login' element={<Login/>}/>
    <Route path='/admin/dashboard' element={<Dashboard/>}/>
    <Route path='/admin/book' element={<Book/>}/>
    <Route path='/admin/editbook/:id' element={<BookEdit/>}/>
    <Route path='/admin/editgr/:id' element={<GREdit/>}/>
    <Route path='/admin/gr' element={<GR/>}/>
    <Route path='/admin/newgr' element={<NewGR />}/>
    <Route path='/gr' element={<GRList />}/>
    <Route path='/admin/services' element={<Service/>} />
    <Route path='/admin/newservice' element={<NewService/>} />
    <Route path='/admin/editservice/:id' element={<ServiceEdit/>} />
    <Route path='/services' element={<ServicesList/>} />
    <Route path='/services/:id' element={<ServiceView/>} />
    <Route path='/contact' element={<Contactus/>} />
   

    </Routes>
    </BrowserRouter>
  );
}

export default App;
