const express = require('express');
const app = express();

const users = []

app.get('/users', (req, res) => {
    res.json(users)
    res.send("Welcome to the home page");
});

port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Server launch success");
});
