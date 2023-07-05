const mongoose = require('mongoose');

async function databaseConnection(){
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if(connection){
        console.log('Database connected')
    }else{
        console.log('Database not connected')
    }
}
module.exports = databaseConnection