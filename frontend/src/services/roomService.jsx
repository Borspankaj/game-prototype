
async function checkValidRoom() {
    const data = await fetch(`http://localhost:3000/authenticate-room?room=${roomName}`)
    const code = data.status
    console.log(code)
    if(code == 200) return true
    return false
}

export {checkValidRoom};