const {getRooms} = require('../index')

function checkRoom(roomCode) {
    const rooms = getRooms()

    if(rooms[roomCode] === undefined) return false
    return true

}

module.exports = {
    checkRoom
}