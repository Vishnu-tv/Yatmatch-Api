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
    id: 1,
    name: "Sandhya",
    email: "sandhya@gmail.com",
    subscribed: "no"
  },
  {
    id: 2,
    name: "Vishnupriya",
    email: "tvvishnupriya96@gmail.com",
    subscribed: "yes"
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

const create_1 = {
  results: [
    {
      objectId: 245,
      title: "Profile In Yatmatch",
      link: "https://fe-yatmatch.demoserver.work/",
      created: "2016-09-15",
      updated: "2016-09-28",
      actions: [
        {
          type: "CONFIRMATION_ACTION_HOOK",
          confirmationMessage: "Are you sure you want to delete this ticket?",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          httpMethod: "DELETE",
          associatedObjectProperties: [
            "protected_account"
          ],
          uri: "https://example.com/tickets/245",
          label: "Delete"
        }
      ]
    },
  ],
  settingsAction: {
    "type": "IFRAME",
    "width": 890,
    "height": 748,
    "uri": "https://example.com/settings-iframe-contents",
    "label": "Settings"
  },
  primaryAction: {
    type: "IFRAME",
    width: 890,
    height: 748,
    uri: "https://example.com/create-iframe-contents",
    label: "Create Ticket"
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

const form = {
  "name": "DemoForm",
  "action": "",
  "method": "",
  "cssClass": "",
  "redirect": "",
  "submitText": "Submit",
  "followUpId": "",
  "notifyRecipients": "",
  "leadNurturingCampaignId": "",
  "formFieldGroups": [
      {
          "fields": [
              {
                  "name": "firstname",
                  "label": "First Name",
                  "type": "string",
                  "fieldType": "text",
                  "description": "",
                  "groupName": "",
                  "displayOrder": 0,
                  "required": false,
                  "selectedOptions": [],
                  "options": [],
                  "validation": {
                      "name": "",
                      "message": "",
                      "data": "",
                      "useDefaultBlockList": false
                  },
                  "enabled": true,
                  "hidden": false,
                  "defaultValue": "",
                  "isSmartField": false,
                  "unselectedLabel": "",
                  "placeholder": ""
              }
          ],
          "default": true,
          "isSmartGroup": false
      },
      {
          "fields": [
              {
                  "name": "lastname",
                  "label": "Last Name",
                  "type": "string",
                  "fieldType": "text",
                  "description": "",
                  "groupName": "",
                  "displayOrder": 1,
                  "required": false,
                  "selectedOptions": [],
                  "options": [],
                  "validation": {
                      "name": "",
                      "message": "",
                      "data": "",
                      "useDefaultBlockList": false
                  },
                  "enabled": true,
                  "hidden": false,
                  "defaultValue": "",
                  "isSmartField": false,
                  "unselectedLabel": "",
                  "placeholder": ""
              }
          ],
          "default": true,
          "isSmartGroup": false
      },
      {
          "fields": [
              {
                  "name": "adress_1",
                  "label": "Adress 1",
                  "type": "string",
                  "fieldType": "text",
                  "description": "",
                  "groupName": "",
                  "displayOrder": 2,
                  "required": false,
                  "selectedOptions": [],
                  "options": [],
                  "validation": {
                      "name": "",
                      "message": "",
                      "data": "",
                      "useDefaultBlockList": false
                  },
                  "enabled": true,
                  "hidden": false,
                  "defaultValue": "",
                  "isSmartField": false,
                  "unselectedLabel": "",
                  "placeholder": ""
              }
          ],
          "default": true,
          "isSmartGroup": false
      }
  ],
  "createdAt": 1318534279910,
  "updatedAt": 1413919291011,
  "performableHtml": "",
  "migratedFrom": "ld",
  "ignoreCurrentValues": false,
  "metaData": [],
  "deletable": true
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
  results: {
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
const alertButton = {
  sections: [
    {
      type: "text",
      text: "Click the button below to retrieve data."
    },
    {
      type: "button",
      text: "Primary button",
      tooltip: "Hover text.",
      variant:"primary",
      // onClick: {
      //   "type": "SERVERLESS_ACTION_HOOK",
      //   "serverlessFunction": "crm-card"
      // }
    }
  ]

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
        res.json(form);
      }
      else {
        res.json(subscribeAction);
      }

    }
  });

app.get('/addContact', (req, res) => {
  // const filePath = path.resolve(__dirname, './public', 'phone.html')
  // fs.readFile(filePath, 'utf8', function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   data = data.replace("$_NAME", contactName);
  //   data = data.replace("$_EMAIL", contactEmail);
  //   console.log('Email', contactEmail)
  //   res.send(data);
  // });
  res.json(form);
});



app.get('/addCon', (req, res) => {
  // res.json(alertButton)
  window.parent.postMessage(JSON.stringify({"action": "DONE"}), "*");
});

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))