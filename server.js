require('dotenv').config({path : './.env'});
const express = require('express');
const databaseConnection = require('./api/database/database');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

// Database connection
databaseConnection();

// Routes
server.use('/api',require('./api/routes/notes.route'));
server.use('/api/auth',require('./api/routes/auth.route'));


// root route
server.get('/', (req, res)=>{
    res.json({
        'status': 'ok',
        'app' : 'devshare'
    })
})

// Ports config
const port = process.env.PORT || 3030;
server.listen(port, ()=>{
    console.log(`server listening on http://localhost:${port}`)
})