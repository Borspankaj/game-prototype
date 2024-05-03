import React, { useState } from 'react';

const RoomComponent = () => {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  const joinRoom = () => {
    
    console.log(`Joining room ${roomName} as ${name}`);
  };

  const createRoom = () => {
 
    const roomCode = generateRoomCode()
    
    console.log(`Creating room ${roomName} with host ${name}`);
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
    </div>
  );
};

export default RoomComponent;
