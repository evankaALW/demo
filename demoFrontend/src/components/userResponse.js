import React, { useState, useEffect } from "react";
import "../styles/userResponse.css";
import config from '../config';
const apiUrl = `${config.apiBaseUrl}`;

export const UserResponse = () => {
  const [userResponse, setUserResponse] = useState([]);
  const [filteredCardID, setFilteredCardID] = useState("");
  const [filteredPhoneNumber, setFilteredPhoneNumber] = useState("");

  const fetchData = async () => {
    try {
      const response =  await fetch(`${apiUrl}/api/getUserResponse`);
      const data =   await response.json();
      setUserResponse(data.result);
    } catch (error) {
       console.error("Error fetching user response:", error);
     }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardIDChange = (event) => {
    setFilteredCardID(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setFilteredPhoneNumber(event.target.value);
  };

  const filteredUserResponse = userResponse.filter(
    (response) =>
      response.cardID.includes(filteredCardID) &&
      response.phoneNumber.toString().includes(filteredPhoneNumber)
  );

  return (
    <div className="container">
      <h2>User Response Details</h2>
      <div className="filter-container">
        <label >Filter by Card ID:</label>
        <input style={{ width: '30%'}}
          type="text"
          value={filteredCardID}
          onChange={handleCardIDChange}
        />
      </div>
      <div className="filter-container">
        <label >Filter by Phone Number:</label>
        <input style={{ width: '30%'}}
          type="text"
          value={filteredPhoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      {filteredUserResponse.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sr Number</th>
              <th>Date and Time</th> 
              <th>User Name</th>
              <th>User ID</th>
              <th>Card ID</th>
              <th>Phone Number</th>
              <th>Question Type ID</th>
              <th>Option Selected</th>
              <th>Correct Option</th>
              <th>User Answer</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserResponse.map((userResponse, index) => (
              <tr key={userResponse.userResponseID} className="user-response-details">
                <td>{index + 1}</td>
                {/* <td>{((userResponse.createdAt))}</td> */}
                <td>{userResponse.createdAt!=null?(new Date(userResponse.createdAt)).toLocaleString():''}</td> 
                <td>{userResponse.userName}</td>
                <td>{userResponse.userID}</td>
                <td>{userResponse.cardID}</td>
                <td>{userResponse.phoneNumber}</td>
                <td>{userResponse.questionTypeID}</td>
                <td>{userResponse.optionSelected}</td>
                <td>{userResponse.correctOption}</td>
                  <td>
                    {userResponse.optionSelected.toLowerCase() ===
                    userResponse.correctOption.toLowerCase()
                      ? 'Right Answer'
                      : userResponse.correctOption === 'NIL'
                      ? 'N/A'
                      : 'Wrong Answer'}{' '}
                    </td> 
              </tr>
            ))}
          </tbody>
        </table>) : (<p>No matching user responses found.</p>)}
      </div>
  )};
