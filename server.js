const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const app = express();
const bcrypt = require('bcrypt');

const server = http.createServer(app)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests
});

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);


const users = []


app.get('/', (req, res) => {
    res.send("Oops! Somehow you landed on our NodeJS server. To head back to the main site, simply press that back arrow on your browser.")
})

app.get('/users', (req, res) => {
    res.json(users)
    res.send("Welcome to the home page");
});

app.post('/users', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        // add a check here to see if user already exists.
        users.push(user)
        res.status(201).send("User created successfully")
    } catch {
        res.status(500).send("Password encryption failed.")
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user == null){
        return res.status(400).send("User not found")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send("Login Successful.")
        }else{
            res.send("Login Unsuccessful.")
        }
    } catch {
        res.status(500).send()
    }
})

port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Server launch success");
});

// AWS MySQL Password: !STQZPmh$H$5Lz2
