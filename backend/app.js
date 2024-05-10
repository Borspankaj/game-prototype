const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const cors = require('cors')
const {creatingRoom} = require('./index');
const { checkRoom } = require('./middlewares/auth');
const { initializeDatabase, db }  = require('./database/dbconnect');
const roomRouter = require('./routes/room/room.router')


app.use(cors())

const server = http.createServer()

initializeDatabase()


app.use('/room' , roomRouter)

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