const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const cors = require('cors')
const {creatingRoom} = require('./index');
const { checkRoom } = require('./middlewares/auth');

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
app.get("/authenticate-room",(req,res)=>{

  
  const roomCode = req.query.room;
  const isValid = checkRoom(roomCode)
  console.log(111)
  if (isValid) {
    res.status(200)
    res.send("success")
  }
  res.status(403)
  res.send("invalid")


})





app.listen(port, () => {
  console.log(`listening on port ${port}`)
})