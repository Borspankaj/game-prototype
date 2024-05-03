const express = require('express')
const app = express()
const port = 3000
const {generateRandomCode} = require('./utils/roomCode')
const http = require('http');
const url = require('url');
const {WebSocketServer} = require('ws');
const uuidv4=require('uuid').v4

const server =http.createServer()


app.get('/room' , (req, res) => {
  console.log(req.query.username)
  const username = req.query.username;
  const roomCode = generateRandomCode()
  res.send(`ello ${username} room code : ${roomCode}`)

})





app.listen(port, () => {
  console.log(`listening on port ${port}`)
})