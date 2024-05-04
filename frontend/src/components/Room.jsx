import React from 'react'
import { json, useLocation, useParams } from 'react-router-dom'
import  useWebSocket  from 'react-use-websocket'

const Room = () => {
    const roomid=useParams().roomId
    const username=useLocation().state.username
    const URL=`ws://localhost:3001/r`
    const [message,setMessage]=React.useState('')
    
    const client=useWebSocket(URL,{
        queryParams:{username:username,roomCode:roomid}
    })
    const me=client.lastJsonMessage


    return (
    <div>
        <h1>Room {roomid}</h1>
        <input onChange={
            (e)=>{
                setMessage(e.target.value)
            }

        } type="text" placeholder="Enter message" value={message}/>
        <button onClick={
            ()=>{
                client.sendJsonMessage({message:message})
            }
        
        }>Send</button>
        {me && Object.keys(me).map((key)=>{
            return <div key={key}>
                <p>
                 {me[key].username} 
                 {me[key].state.message}
                </p>
                </div>
        })}
        

    </div>
  )
}

export default Room
