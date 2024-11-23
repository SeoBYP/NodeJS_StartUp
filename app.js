const fs = require('fs');
const path = require('path');

const express = require('express')

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currentTime', (req, res) => {
    res.statusCode = 200;
    res.end('<h1>' + new Date().toISOString() + '</h1>');
})

app.get('/', (req, res) => {
    res.send('<form action="/store-user" method="POST"><label>Your Name : </label><input type="text" name="userName"><button>Sumbit</button></form>');
})

app.post('/store-user', (req, res) => {
    const username = req.body.userName;
    console.log(username);

    const filePath = path.join(__dirname, 'data','users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    existingUsers.push(username);

    fs.writeFileSync(filePath,JSON.stringify(existingUsers));

    res.send('<h1>User Name Stored!</h1>');
})

app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'data','users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let responseData = '<ul>'
    for(const user of existingUsers) {
        responseData += '<li>' + user + '</li>';
    }
    responseData += '</ul>';
    res.send(responseData);
})

app.listen(3000);




