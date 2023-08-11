import './App.css';
import Registration from './Auth/registrationForm/Registration';
import Login from './Auth/loginForm/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Main from './View/Main';

function App() {
  const [apiData, setAPIData] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login setAPIData={setAPIData} />} />
        <Route path='/board' element={<Main apiData={apiData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
