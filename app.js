
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const os = require('os');
const axios = require('axios')
const morgan = require('morgan')
const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser')

const privateKey = fs.readFileSync('cert/mylab.local.key', 'utf8');
const certificate = fs.readFileSync('cert/mylab.local.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const express = require('express');
const app = express();


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser())
const port = 4000;
app.use(cors());
app.use(morgan('dev'));
//import json file

let rawdata = fs.readFileSync('data.json');
let products = JSON.parse(rawdata);

app.get('/', (req, res) => {
    res.send('Requester ip = ' + req.ip)
})

app.get('/f5', async (req, res) => {
    res.json(products)
})

app.get('/loadtest', async (req, res) => {
    fs.readFile('load-test.json', (err, data) => {
        if (err) throw err;
        let results = JSON.parse(data);
        res.send(results)
    });

})
app.get('/cookie', function (req, res) {
    // Cookies that have not been signed
    res.json({'Cookies':req.cookies})
})
app.get('/header', function (req, res) {
    // Cookies that have not been signed
    res.json({'Headers': req.headers})
})

httpServer.listen(8080, () => {
    console.log(`Listening at http://localhost:8080`);
});
httpsServer.listen(8443, () => {
    console.log(`Listening at http://localhost:8443`);
});
