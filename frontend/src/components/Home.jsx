import React, { useState } from 'react';
import { generateRoomCode } from '../utils/roomCode'
import {useNavigate} from 'react-router-dom'

const RoomComponent = () => {

  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  const joinRoom = () => {
    
    navigate(`/r/${roomName}`, { state: { username: name } })
    console.log(`Joining room ${roomName} as ${name}`);
  };

  const createRoom = () => {

    navigate(`/r/${generateRoomCode()}`, { state: { username: name } })
    
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
