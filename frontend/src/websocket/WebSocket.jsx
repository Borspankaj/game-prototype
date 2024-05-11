import  useWebSocket  from 'react-use-websocket'
import { wshost } from '../services/getHost'

const WebSocketStart=(username,roomid,id)=>{
    const client=useWebSocket(wshost+'/r',{
        queryParams:{username:username,roomCode:roomid,uuid:id}
    })
    return client
}

export default WebSocketStart;