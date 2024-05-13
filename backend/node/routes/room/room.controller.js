const {randomWord} =require('./room.services')

module.exports = {
    getWord:(req,res)=>{
        randomWord((error,result)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },
    
}
