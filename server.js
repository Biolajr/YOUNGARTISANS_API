require('dotenv').config()
const express = require('express');

// epress app
const app = express();


// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to young artisans'})
})

//  listening for requests
app.listen(process.env.PORT, ()=> {
    console.log('listening on port 3000');
})

