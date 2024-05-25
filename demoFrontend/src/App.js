// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scheduler from './components/scheduler.js';
import { Navbar } from './components/navbar.js';
import { Theateroperator } from './components/theaterOperator.js';
import { VideoPlayer } from './components/videoPlayer.js';
import UploadForm from './components/videoUploadForm.js';
import { UserResponse } from './components/userResponse.js';



function App() {
  
  return (
    <div className='maindiv'>
      {/*BroswerRouter tag helps the page to access various routes/sub pages */}
      <BrowserRouter>
      <Navbar />
      <Routes>
        {/* The navbar will be a common element among all the pages with the links provided as routes */}
          <Route path="uploadform" element={<UploadForm />} />   
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="theateroperator" element={<Theateroperator />} />
          <Route path="video-player" element={<VideoPlayer />} />
          <Route path="userResponse" element={<UserResponse />} />

      </Routes>
    </BrowserRouter>

    </div>
  );
}


export default App;
