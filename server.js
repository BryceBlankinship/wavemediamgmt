const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json())

const users = [{name:"Test"}]

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
