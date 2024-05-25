import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/videoPlayer.css';
import config from '../config';
const apiUrl = `${config.apiBaseUrl}`;

export const VideoPlayer = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [jsonVideoURLLinks, setJsonVideoURLLinks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [isCertainTimeReached, setIsCertainTimeReached] = useState(false);
  const [displayToggle, setDisplayToggle] = useState(0);
  const [userResponseToggle, setUserResponseToggle] = useState(1);
  const [videoID, setVideoID] = useState(null);
  const [adStartTime, setadStartTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const togglefs = () => {
    const e = document.getElementById('videoElement');
    const isFullscreen = document.fullscreenElement;
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      e.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })};
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {// Retrieve video links from localStorage
    const storedVideoLinks = JSON.parse(localStorage.getItem('videoLinks'));
    if (storedVideoLinks && storedVideoLinks.length > 0) {
      setVideoLinks(storedVideoLinks);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        togglefs();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoLinks[currentIndex];
       videoRef.current.load();
    }
  }, [currentIndex, videoLinks]);
  
  fetch(`${apiUrl}/api/allVideos`)// Fetch video data from API and compare with the current video URL
  .then(response => response.json())
  .then(data => {
    const matchingVideo = data.find(video => video.videoURL == videoLinks[currentIndex]);
    if (matchingVideo) {
      setVideoID(matchingVideo.videoID);
      setadStartTime(matchingVideo.adStartTime)
      setDuration(matchingVideo.duration);
      console.log(typeof(duration))
      console.log("duration")
    } else {
      setVideoID(null);
    }
  })
  .catch(error => {
    console.error('Error fetching video data:', error);
  });

  const handleVideoEnded = () => { //Check if the current index is less than the length before incrementing
    if (currentIndex < videoLinks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleTimeUpdate = () => {
    console.log("handleTimeUpdate")
     if (videoRef.current.currentTime > 0 && videoRef.current.currentTime<adStartTime){// Check if the current time is greater than or equal to a certain value
      setDisplayToggle("0");
      setUserResponseToggle("1");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
     if (videoRef.current.currentTime >= adStartTime && videoRef.current.currentTime<duration-2){
      setDisplayToggle("1");
      setUserResponseToggle("0");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
    if(videoRef.current.currentTime >= duration-2){
      setDisplayToggle("0");
      setUserResponseToggle("1");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
  };

  const handleChangeDisplayToggle = async (displayToggle, currentVideoID, userResponseToggle) => {
    const fetchData = async () => {
      const url = `${apiUrl}/api/changeDisplayToggle`;
      const data = {
        displayToggle: displayToggle,
        videoID : currentVideoID,
        userResponseToggle: userResponseToggle,
      };
      try {
        console.log("reached put request try block",adStartTime)
        const response = await axios.put(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('PUT request successful:', response.data);
      } catch (error) {
        console.error('Error during PUT request:', error);
      }
    };
    fetchData();
};

  return (
    <div>
      <h1>Video Player</h1>
      {videoLinks.length > 0 && (
        <div class="videoScreen">
          <video id="videoElement" width= {windowDimensions.width} height ={windowDimensions.height} autoPlay controls onEnded={handleVideoEnded} onTimeUpdate={handleTimeUpdate} ref={videoRef}>
            <source src={videoLinks[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1>{videoID} {adStartTime}</h1>
        </div>
      )}
    </div>
  )};





















{/*} 
        if(response.length>0)
        {
          const fetchDataOne = async () => {
              const url = await fetch(`http://localhost:8010/api/allVideoDetails/`);
              const data = {
                // Your data to be sent in the request body
                displayToggle: displayToggle,
                videoID : currentVideoID,
              };
              try {
                const response = await axios.get(url, data, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                console.log('GET request successful:', response.data);
              }catch (error) {
                // Handle errors here
                console.error('Error during PUT request:', error);
              }
          };
          fetchDataOne();
        }*/}