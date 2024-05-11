import React, { useState } from 'react';
import { generateRoomCode } from '../utils/roomCode'
import {useNavigate} from 'react-router-dom'
import { checkValidRoom } from '../services/roomService';
import { v4 as uuid } from 'uuid';
const RoomComponent = () => {

  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const host=window.location.hostname
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  const joinRoom = () => {
    fetch(`http://${host}:3000/authenticate-room?room=${roomName}`).
    then((response) => {
      if(response.status === 200)
        navigate(`/r/${roomName}`, { state: { username: name,id:uuid() } })

    }).catch(function(error) {
      console.log(error);
    });
    
  };

  const createRoom = () => {

    navigate(`/r/${generateRoomCode()}`, { state: { username: name,id:uuid() } })
    
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <br />
      <input
        type="text"
        id="roomName"
        value={roomName}
        onChange={handleRoomChange}
        placeholder="Enter room name"
      />
      <br />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={createRoom}>Create Room</button>

      <div>
        <button>get Rooms</button>
      </div>
    </div>
  );
};

export default RoomComponent;
