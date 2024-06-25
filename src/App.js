import './App.css';
import Login from './login/login.jsx';
import CreateUser from './new_user/new_user.jsx';
import HomePage from './home_page/home_page.jsx';
import PostBlog from "./post_blog/post_blog.jsx";
import {React, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, useNavigate ,Route, Routes, Link} from 'react-router-dom';
// import {format} from 'date-fns';
import api from "./api/blogs";
 
function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signUp" element={<CreateUser/>}/>
            <Route path="/homePage/:credentials" element={<HomePage/>}/>
            <Route path="/postBlog/:userDetails" element={<PostBlog/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
