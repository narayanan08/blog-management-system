import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, useNavigate ,Route, Routes, Link} from 'react-router-dom';
// import {format} from 'date-fns';
import Login from './login/login';
import BlogForm from './blog_form/blog_form.jsx';
import Register from './registration/registration.jsx';
import HomePage from './home_page/home_page.jsx';
import ShowComments from './blog_form/show_comments.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/blogForm" element={<BlogForm/>}/>
            <Route path="/showComments/:postId" element={<ShowComments/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;



