
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/theatre.css';
import config from '../config';
const apiUrl = `${config.apiBaseUrl}`;

export const Theateroperator = () => {
  const [schedulerData, setSchedulerData] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');
  useEffect(() => {// Fetch scheduler data from the backend API using axios
    axios.get(`${apiUrl}/api/allSchedulerData`)
      .then(response => {
        setSchedulerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching scheduler data:', error);
      });
  }, []);

  const handlePlayButtonClick = (scheduler) => {// Extract video links from the scheduler
    console.log("scheduler",scheduler)
    console.log("scheduler.video_links",scheduler.video_links)
    console.log(" type of scheduler.video_links",typeof(scheduler.video_links))
    scheduler.video_links = JSON.parse(scheduler.video_links)
    var validVideoLinks = (scheduler.video_links)
      .filter(videoLink => videoLink && Object.values(videoLink)[0])
      .map(videoLink => videoLink && Object.values(videoLink)[0]);
    const myArray = Object.values(validVideoLinks);//convert object of values - link to array of links
    localStorage.setItem('videoLinks', JSON.stringify(myArray));// Save valid video links to localStorage
    window.location.href = 'video-player'; // Redirect to the video player page
  };

  const playVideo = (videoUrl) => {
    console.log('Opening video:', videoUrl);
    window.location.href = videoUrl;
  };

  const renderSchedulerPlaylist = () => {
    if (!schedulerData.scheduler || schedulerData.scheduler[0].length === 0) {
      return <p>No scheduler data available.</p>;
    }
    const flattenedSchedulerData = schedulerData.scheduler.flat();// Flatten the nested arrays
    const midpoint = Math.ceil(flattenedSchedulerData.length / 2);//eliminate duplicate data returning from teh response body/occurs due to await and mvc clash
    const firstHalfData = flattenedSchedulerData.slice(0, midpoint);// Slice the array to get the first half

    console.log("typeof renderSchedulerPlaylist schedulerData ",firstHalfData);
    console.log("schedulerData.scheduler.length",firstHalfData.length)

    return firstHalfData.map((scheduler, index) => (
      <div key={index} className="nested-scheduler-container">
          <div className="scheduler-playlist-item">
              <h3>{`Slot ${scheduler.slot_index} - ${new Date(scheduler.start_date).toDateString()}`}</h3>
              <ul>
                  {JSON.parse(scheduler.video_links) // Parse the JSON string into an array
                      .filter(videoLink => videoLink && Object.values(videoLink)[0]) // Filter out null or empty links
                      .map((videoLink, videoIndex) => (
                          <li key={videoIndex}>
                              <a href={Object.values(videoLink)[0]} target="_blank" rel="noopener noreferrer">{`Video ${videoIndex + 1}: View Video`}</a><br />
                          </li>))}
              </ul>
              <button onClick={() => handlePlayButtonClick(scheduler)}>Play All</button>
          </div>
      </div>
  ))};
  const theaters = [//hardcoded theatre names added change this
    { id: 1, name: 'Theater A' },
    { id: 2, name: 'Theater B' },
    { id: 3, name: 'Theater C' },
    { id: 4, name: 'Theater D' },
  ];
  return (
    <>
      <h1>Operator Playlist</h1>
      <div className="scheduler-playlist-wrapper">
        {renderSchedulerPlaylist()}
      </div>
    </>)};