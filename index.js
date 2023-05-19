const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use(bodyParser.json());
var contactEmail = '';
var contactName = '';
const users = [
    {
        id:1,
        name:"Sandhya",
        email:"sandhya@gmail.com",
        subscribed:"no"
    },
    {
        id:2,
        name:"Vishnupriya",
        email:"tvvishnupriya96@gmail.com",
        subscribed:"yes"
    }
];


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

  const addContactFormAction = {
    results:{
          type: "form",
          content: [
            {
              type: "input",
              name: "example_input",
              inputType: "text",
              label: "Name",
              initialValue: "Contact Name"
            },
            {
              type: "input",
              name: "example_input",
              inputType: "text",
              label: "email",
              initialValue: "This is the default value for this field."
            },
            {
              type: "button",
              text: "Submit form",
              onClick: {
                type: "SUBMIT",
                serverlessFunction: "exampleFunction"
              }
            }
          ]
    }
  }

app.get('/dataFetchUrl',
 (req, res) => {
    const email = req.query.userEmail;
    const userMail = req.query.email
    const name = req.query.firstname + ' '+ req.query.lastname;
    contactEmail = userMail;
    contactName = name;
    const exists = users.some(el => el.email === email);
    console.log('exists',exists)
    if(!exists)
    {
        res.json(createProfileAction);
    }
    else{
       const sub =  users.filter(el => el.email === email).map(filteredObj => filteredObj.subscribed);
           if(sub == 'yes')
           {
            res.json(addContactAction);
           }
           else{
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
        console.log('Email',contactEmail)
        res.send(data);
      });
    
});
app.get('/addCon', (req, res) => {
  res.json('added successfully')
  // res.json(subscribeAction);
});

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))