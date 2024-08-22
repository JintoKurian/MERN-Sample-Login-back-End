require('dotenv').config()
const express = require('express');
const router = require('./router/auth-router');
require('./DB/connection');
const cors = require('cors')


const app = express();
app.use(express.json())
app.use(cors())

const PORT = 5000 || process.env.PORT

app.use('/api', router)


app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
    
})
