const express = require('express')
const app = express()
const port = 3000
const {generateRandomCode} = require('./utils/roomCode')
const http = require('http');
const url = require('url');
const {WebSocketServer} = require('ws');
const uuidv4=require('uuid').v4
const cors = require('cors')
const {creatingRoom} = require('./index')

app.use(cors())

const server =http.createServer()


app.get('/r' , (req, res) => {
  console.log(req.query.username)
  const username = req.query.username;
  const roomCode=req.query.roomcode
  // const roomCode = generateRandomCode()
  res.send(`Hello ${username} room code : ${roomCode}`)
  
})
creatingRoom(server)
app.get("/rooms",(req,res)=>{
})





app.listen(port, () => {
  console.log(`listening on port ${port}`)
})