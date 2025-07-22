let express = require('express')
let app = express()
let cors = require('cors')
const {PORT} = require('./config/env')
const authRoutes = require('./routes/authRoutes')

require('dotenv').config()

let corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is working on ${PORT} port`);
})

