const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const os = require('os');
var morgan = require('morgan')
swaggerJsdoc = require("swagger-jsdoc")
// const swaggerDocument = require('./swagger.json');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const port = 4000;
app.use(cors());
app.use(morgan('dev'));
//import json file
const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let products = JSON.parse(rawdata);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0-beta",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            // license: {
            //     name: "MIT",
            //     url: "https://spdx.org/licenses/MIT.html",
            // },
            // contact: {
            //     name: "LogRocket",
            //     url: "https://logrocket.com",
            //     email: "info@email.com",
            // },
        },
    },
    apis: ["app.js"],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

/**
 * @swagger
 * /headers:
 *   get:
 *     description: Get all data from request headers
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/headers', (req, res) => {
    res.send(req.headers)
})

/**
 * @swagger
 * /:
 *   get:
 *     description: get hostname and get local ip address
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/', (req, res) => {
    res.send('Requester ip = '+req.ip)
})

app.get('/method', (req, res) => {
    res.send(req.method)
})

app.get('/test/url', (req, res) => {
    res.send(req.url)
})

/**
 * @swagger
 * /f5:
 *   get:
 *     description: Get some F5 products
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/f5', (req, res) => {
    res.json(products)
})

app.post('/compare', (req, res) => {
    console.log(req.body)
    const num1 = req.body.num1
    const num2 = req.body.num2

    if (num1 > num2) {
        res.send(`${num1} more than ${num2}`)
    }
    else {
        res.send(`${num2} more than ${num1}`)
    }
    
})




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});