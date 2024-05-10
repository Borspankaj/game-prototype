const http = require('http');
const url = require('url');
const {WebSocketServer} = require('ws');
const { randomWord } = require('./routes/room/room.services');
const uuidv4=require('uuid').v4


const rooms = {}

const getRooms = () => {
    return rooms;
}
const creatingRoom = (server) => {
    const wsServer=new WebSocketServer({server , path : `/r`})

    server.listen(process.env.SOCKET_PORT,()=>{
        console.log('listening on port',process.env.SOCKET_PORT)
    })

    const broadcast=(roomCode)=>{
        const message = JSON.stringify({users:rooms[roomCode].users,randomWord : rooms[roomCode].randomWord});
        console.log(message,'here')
        rooms[roomCode].connections.forEach((connection) => {
            connection.send(message);
        });
    }


    const handleMessege=(byte,uuid,roomCode)=>{
        const message=JSON.parse(byte.toString())

        // console.log(message);
        if(message.type==='randomWord'){
            // rooms[roomCode].users[uuid].state.randomword = message.message;
            rooms[roomCode].randomWord=message.message
            
        }
        // rooms[roomCode].users[uuid].state = message;
        // console.log(roomCode,'roomcode')
        broadcast(roomCode)
    }



    wsServer.on('connection',(connection,request)=>{
        
        console.log('connected')
        const { query } = url.parse(request.url, true);
       
        const roomCode = query.roomCode
        const username = query.username;
        const uuid = query.uuid
        if (username ===undefined){

        }
        if (!rooms[roomCode]) {
            rooms[roomCode] = {
                connections: [],
                users: {
                    
                },
                randomWord:''
            };
        }
        rooms[roomCode].connections.push(connection);

        rooms[roomCode].users[uuid] = {
            username: username ,
            state: {
                message: ""
            },
        };
        console.log(Object.keys(rooms[roomCode].users).length)
        broadcast(roomCode);
        connection.on('message', (byte) => handleMessege(byte, uuid, roomCode));

        connection.on('close', () => {
            
            delete rooms[roomCode].connections[rooms[roomCode].connections.indexOf(connection)];
            delete rooms[roomCode].users[uuid];
            if (Object.keys(rooms[roomCode].users).length === 0 ){
                delete rooms[roomCode];
                console.log(roomCode)
                
            }
            else broadcast(roomCode);
        });


    })
}
module.exports = {creatingRoom,getRooms}

