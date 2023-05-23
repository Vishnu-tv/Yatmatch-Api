const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const users = require('./users.json');
const path = require('path');
const fs = require('fs');
app.use(bodyParser.json());
var contactEmail = '';
var contactName = '';
var close = false;
// const users = [
//   {
//     id: 1,
//     name: "Sandhya",
//     email: "sandhya@gmail.com",
//     subscribed: "no"
//   },
//   {
//     id: 2,
//     name: "Vishnupriya",
//     email: "tvvishnupriya96@gmail.com",
//     subscribed: "yes"
//   }
// ];


const createProfileAction = {
  primaryAction: {
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://fe-yatmatch.demoserver.work/register",
    label: "Create Broker Profile"
  }
}



const subscribeAction = {
  primaryAction: {
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://fe-yatmatch.demoserver.work/login",
    label: "Subscibe a Plan"
  }
}



const addContactAction = {
  primaryAction: {
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://yatmatch-api.up.railway.app/addContact",
    label: "Add Yacht"
  }
}

const UserList = {

  results:
    users.map((u) => {
      return {
        objectId: u.id,
        title: u.name,
        link: "http://example.com/1",
        created: "2016-09-15",
        name: u.name,
        email: u.email,
        updated: "2016-09-28",
      }
    }),
  primaryAction: {
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://yatmatch-api.up.railway.app/addContact",
    label: "Add Yacht"
  }

}

app.get('/dataFetchUrl',
  (req, res) => {
    const email = req.query.userEmail;
    const userMail = req.query.email
    const name = req.query.firstname + ' ' + req.query.lastname;
    contactEmail = userMail;
    contactName = name;
    const exists = users.some(el => el.email === email);
    if (!exists) {
      res.json(createProfileAction);
    }
    else {
      const sub = users.filter(el => el.email === email).map(filteredObj => filteredObj.subscribed);
      if (sub == 'yes') {
        res.json(UserList);
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
    fs.writeFile("./users.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
})
  // window.parent.postMessage(JSON.stringify({"action": "DONE","message": "Congrats"}), "*");
  // JSON.stringify({"action": "DONE"})
});

app.get('/list', (req, res) => {
  console.log('List', UserList)
  res.send(UserList);
});

app.get('/', (req, res) => {

  res.send('Hello World, from express');
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))