const express = require('express')
const bodyparser = require('body-parser')

const PORT = 3000
const api = require('./routes/api')
const app = express()
app.use(express.json())

app.use('/api',api)
app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT,function(){
    console.log('Server running on localhost :'+PORT);
})