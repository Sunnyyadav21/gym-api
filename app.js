const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb = require('./config/db')
app.use(express.json());
dotenv.config()
connectdb()

const userroute = require('./routes/userroute')
const client = require('./routes/client.route')

app.use('/api/users', userroute)
app.use('/api/client', client)


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('Server started')
})