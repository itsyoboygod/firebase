import React from 'react';
import {BrowserRouter as Router, Route , Routes} from "react-router-dom"
import './App.css';

import {Home} from './Pages/main/Home'
import { Login } from './Pages/Login';
import {CreatePost } from './Pages/create-post/create-post';
import {Navbar} from './components/navbar'

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
