const {db}= require("../../database/dbconnect")

module.exports={
    randomWord: (callback)=>{
        // db.ref('words').once('value',(snapshot)=>{
        //     const data = snapshot.val()
        //     console.log(data)
        //     const keys = Object.keys(data)
        //     const randomIndex = Math.floor(Math.random()*keys.length)
        //     const randomKey = keys[randomIndex]
        //     const randomWord = data[randomKey]
        //     return callback(null,randomWord)
        // })
        db.ref('words').once('value',(snapshot)=>{
            const data = snapshot.val()
            const words=[]
            snapshot.forEach((childSnapshot)=>{
              words.push(childSnapshot.val())
            }
            )
            const keys = Object.keys(data)
            const randomIndex = Math.floor(Math.random()*words[0].length)
            console.log(words[0][randomIndex])
            return callback(null,words[0][randomIndex])
        })
    },
    
}