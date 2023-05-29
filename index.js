const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var users;
var clients;
const path = require('path');
app.use(express.json());
const fs = require('fs');
app.use(bodyParser.json());
const { actionTest,createProfileAction, subscribeAction, addConatctAction, addConatctActionConfirm, listUser, fetchCardData } = require('./actions.js')
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
    var profile = '';
    var result;
    fs.readFile('./users.json', 'utf8', function (err, data) {
      users = JSON.parse(data);
      profile = users.some(el => el.email === email);

      result = fs.readFileSync('./yachts.json', 'utf8', function (err, data) {
        if (err) throw err;
        return data
      });
      fullList = fetchCardData(result);


      if (!profile) {
        res.json(createProfileAction);
      }
      else {
  

        const sub = users.filter(el => el.email === email).map(filteredObj => filteredObj.subscribed);

        clients = fs.readFileSync('./clients.json', function (err, data) {
          if (err) throw err;
          return data
        })

        if (sub == 'yes') {
          const exists = JSON.parse(clients).some(el => el.email === userMail);
  
          if (!exists) {
            res.send(actionTest)
          }
          else {
            res.send(fullList);
          }
  
        }
        else {
          res.json(subscribeAction);
        }
  
      }



    })


  });

app.get('/addContactForm', (req, res) => {
  const filePath = path.resolve(__dirname, './public', 'contact.html')
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

app.get('/addYachtForm', (req, res) => {
  const filePath = path.resolve(__dirname, './public', 'yacht.html')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
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
  res.send('contact Added Successfully');
  fs.readFile('./clients.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(Newdata);
    fs.writeFile("./clients.json", JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  })
  // window.parent.postMessage(JSON.stringify({"action": "DONE","message": "Congrats"}), "*");
});

app.post('/addContacthook',{"mail":"sample"}, (req, res) => {
  console.log('Request from post',req)
  // const Newdata = (
  //   {
  //     id: 3,
  //     name: contactName,
  //     email: contactEmail,
  //     subscribed: "no"
  //   }
    
  // )

  // fs.readFile('./clients.json', function (err, data) {
  //   var json = JSON.parse(data);
  //   json.push(Newdata);
  //   fs.writeFile("./clients.json", JSON.stringify(json), function (err) {
  //     if (err) throw err;
  //   });
  // })
  res.status(200).send({message:"Contact Added successfully"});
  
});
app.get('/addYacht', (req, res) => {
  const Newdata = (
    {
      yachtID: "0001",
      yachtName: req.query.yacht_name,
      listingStatus: req.query.listing_Status,
      askingPrice: req.query.budget,
      description: req.query.description,
      location: req.query.location,
      timeline: req.query.timeline
    }
  )
  res.send('Yacht Added Successfully');
  fs.readFile('./yachts.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(Newdata);
    fs.writeFile("./yachts.json", JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  })
  // window.parent.postMessage(JSON.stringify({"action": "DONE","message": "Congrats"}), "*");
});

app.get('/list', (req, res) => {
  fs.readFile('./clients.json', 'utf8', function (err, data) {
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