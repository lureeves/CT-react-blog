import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navbar from './components/Navbar';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import SinglePost from './views/SinglePost';

function App() {
    let name = 'Brian';

    const now = new Date();
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now) || false);
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    };

    function logUserOut(){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage('You have logged out', 'primary')
    };

    return (
        <div className="App">
            <Navbar username={name} city={"Chicago"} loggedIn={loggedIn} logUserOut={logUserOut} />
            {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={setLoggedIn} />} />
                    <Route path='/create' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/posts/:postId' element={<SinglePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/posts/:postId/edit' element={<EditPost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                </Routes>
                
            </div>
        </div>
    );
}

export default App;