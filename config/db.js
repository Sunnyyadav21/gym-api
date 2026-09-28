const mongoose = require('mongoose')

const connectdb = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log('Date base connected')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectdb