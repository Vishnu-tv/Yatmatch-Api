const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var users = require('./users');
const path = require('path');
app.use(express.json());
const fs = require('fs');
app.use(bodyParser.json());
const { createProfileAction, subscribeAction, addContactAction, listUser, fetchCardData } = require('./actions.js')
var contactEmail = '';
var contactName = '';
var close = false;
var UserList;

app.get('/dataFetchUrl',
  (req, res) => {
    const email = req.query.userEmail;
    const userMail = req.query.email
    const name = req.query.firstname + ' ' + req.query.lastname;
    contactEmail = userMail;
    contactName = name;
    var result;
    const exists = users.some(el => el.email === email);
    result = fs.readFileSync('./users.json', 'utf8', function (err, data) {
      if (err) throw err;
      return data
    });


    fullList = fetchCardData(result);

    if (!exists) {
      res.json(createProfileAction);
    }
    else {
      const sub = users.filter(el => el.email === email).map(filteredObj => filteredObj.subscribed);
      if (sub == 'yes') {
        res.send(fullList);
      }
      else {
        res.json(subscribeAction);
      }

    }

  });

app.get('/addContact', (req, res) => {
  const filePath = path.resolve(__dirname, './public', 'phone.html')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace("$_NAME", contactName);
    data = data.replace("$_EMAIL", contactEmail);
    console.log('Email', contactEmail)
    res.send(data);
  });

});



app.get('/addCon', (req, res) => {
  const Newdata = (
    {
      id: 3,
      name: req.query.name,
      email: req.query.email,
      subscribed: "no"
    }
  )
  res.send('Added');
  fs.readFile('./users.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(Newdata);
    fs.writeFile("./users.json", JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  })
  // window.parent.postMessage(JSON.stringify({"action": "DONE","message": "Congrats"}), "*");
});

app.get('/list', (req, res) => {
  fs.readFile('./users.json', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    const UserList = listUser(data)
    res.send(UserList);
  });
});


app.get('/', (req, res) => {

  res.send('Hello User, from express');
});

app.listen(port, () => console.log(`Hello  listening on port ${port}!`))