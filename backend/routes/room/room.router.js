const {getWord}=require('./room.controller')
const router=require('express').Router()
const {getRooms}=require('../../index')


router.get("/",getWord)


router.get("/getRooms",(req,res)=>{
    const rooms=getRooms()
    const keys=Object.keys(rooms)
    const data=[]
    keys.forEach((key)=>{
        data.push({
            roomCode:key,
            players:rooms[key].users
        
        })
    })
    console.log(data)
    
    res.send(data)
})

module.exports=router