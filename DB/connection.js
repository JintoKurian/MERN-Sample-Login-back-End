const mongoose = require('mongoose')

const connectionString = process.env.DATABASE


mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlass success connected with login");
}).catch((err)=>{
    console.log(`MongoDB Connection Failed error: ${err}`);
    
})