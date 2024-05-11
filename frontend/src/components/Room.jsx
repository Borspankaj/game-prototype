import {React,useEffect,useState} from 'react'
import { json, useLocation, useParams } from 'react-router-dom'
import  useWebSocket  from 'react-use-websocket'
import { wshost,httphost } from '../services/getHost'

import Penciltool from './PencilTool'
import WebSocketStart from '../websocket/WebSocket'

const Room = () => {
    const roomid=useParams().roomId
    const username=useLocation().state.username
    const host=window.location.hostname
    
    const [id,setId]=useState(useLocation().state.id)
    const [userDetails,setUserDetails]=useState()
    const client=WebSocketStart(username,roomid,id)
    
    
    

    const me=client.lastJsonMessage

    useEffect
    (()=>{
        
        // console.log(me[id].state,'here')
        setUserDetails({
            ...userDetails,
            
            randomWord:me&&me.randomWord
        })
    },[me])
    useEffect(()=>{
        setUserDetails({
            usename:username,
            id:id,
            randomWord:(me&&me.randomWord)|| '',
        })
    },[])

    
    return (
    <div>
        <div className="App">
        <Penciltool 
        client={client}
        username={username}
        />

        </div>
        <h1>Room: {roomid}</h1>
        <h2>Username: {username}</h2>
        {/* <input onChange={
            (e)=>{
                setMessage(e.target.value)
            }

        } type="text" placeholder="Enter message" value={message}/> */}

        <button onClick={
            async()=>{
                fetch(`${httphost}/room`).
                then((res)=>res.json()).
                then((data)=>{
                    client.sendJsonMessage({message:data.data,type:'randomWord'})
                }).catch((err)=>console.log(err))
            }
        
        }>Start</button>
        
        <p>{userDetails && userDetails.randomWord}</p>

        {me && Object.keys(me.users).map((key)=>{
            return <div key={key}>
                <p>
                 {me.users[key].username}
                 
                </p>
                </div>
        })}
        <h1></h1>

    </div>
  )
}

export default Room
