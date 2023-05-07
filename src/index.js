import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StateProvider } from './data/StateProvider';
import Home from './pages/Home';
import ElectionPage from './pages/ElectionPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewElection from './pages/NewElection';
import MyElections from './pages/MyElections';
import AddVoter from './components/AddVoter';
import AddCandidate from './components/AddCandidate';
import Vote from './components/Vote';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='electionpage' element={<ElectionPage/>}/>
          <Route path='newelection' element={<NewElection/>}/>
          <Route path='myelections' element={<MyElections/>}/>
          <Route path='addvoter' element={<AddVoter/>}/>
          <Route path='addcandidate' element={<AddCandidate/>}/>
          <Route path='addvote' element={<Vote/>}/>
        </Routes>
      </BrowserRouter>
    </StateProvider>
    
  </React.StrictMode>
);

