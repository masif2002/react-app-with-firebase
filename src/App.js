import './App.css';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Upload from './components/Upload';

// import { app, db } from './firebaseConfig.js'

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
