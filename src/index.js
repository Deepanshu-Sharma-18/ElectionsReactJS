import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import ElectionPage from './pages/ElectionPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewElection from './pages/NewElection';
import MyElections from './pages/MyElections';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='electionpage' element={<ElectionPage/>}/>
          <Route path='newelection' element={<NewElection/>}/>
          <Route path='myelections' element={<MyElections/>}/>

        </Routes>
      </BrowserRouter>
    
  </React.StrictMode>
);

