const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;
app.use(cors());

//import json file
const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let products = JSON.parse(rawdata);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/headers',(req, res) => {
    res.send(req.headers)
})

app.get('/method',(req, res) => {
    res.send(req.method)
})

app.get('/test/url',(req, res) => {
    res.send(req.url)
})

app.get('/f5',(req, res) => {
    res.json(products)
})

app.post('/compare',(req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2

    if(num1 > num2){
        res.send(`${num1} more than ${num2}`)
    }
    else{
        res.send(`${num2} more than ${num1}`)
    }   
    res.send(req.headers)
})




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});