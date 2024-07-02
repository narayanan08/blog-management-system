import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, useNavigate ,Route, Routes, Link} from 'react-router-dom';
// import {format} from 'date-fns';
import Login from './login/login';
import BlogForm from './blog_form/blog_form.jsx';
import Register from './registration/registration.jsx';
import HomePage from './home_page/home_page.jsx';
import ShowComments from './blog_form/show_comments.jsx';
import SomePerson from './person/person.jsx';
import ShowBlogOfLoggedIn from './blog_form/show_blog_of_logged_in.jsx';
import ShowBlogOfFollowing from './blog_form/show_blog_of_following.jsx';
import Following from './home_page/following.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route exact path="/:somePersonUserName" element={<SomePerson/>}/>
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/blogForm" element={<BlogForm/>}/>
            <Route path="/following" element={<Following/>}/>
            <Route path="/showComments/:postId/:isLoggedInUser" element={<ShowComments/>}/>
            {/* <Route path="/person/:somePersonUserName" element={<SomePerson/>}/> */}
            <Route path="/fullContent/true/:title/:content/:likesCount/:timeStamp" element={<ShowBlogOfLoggedIn/>}/>
            <Route path="/fullContent/false/:title/:content/:likesCount/:timeStamp/:blogId" element={<ShowBlogOfFollowing/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;



