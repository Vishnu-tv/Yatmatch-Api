const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = [
    {
        id:1,
        name:"Sandhya",
        email:"sandhya@gmail.com"
    },
    {
        id:2,
        name:"Vishnupriya",
        email:"vishnu@gmail.com"
    }
];


const action = {
    type: "ACTION_HOOK",
    httpMethod: "POST",
    uri: "https://examplecompany.com/action-hook",
    label: "Add to Yatmatch",
    associatedObjectProperties: [
      "demo1_crm_property"
    ]
  }
      
app.get('/dataFetchUrl',
 (req, res) => {
    const email = req.query.email;
    console.log('Email',email)
    const exists = users.some(el => el.email === email);
    if(!exists)
    {
        res.json(action);
    }
    else{
        res.send('Not inclde');
    }
});

// app.get('/:id', (req, res) => {
//     const id = req.params.id;
//     if (id == 1)
//     {
//         res.send('Hello World, from ID express'+id);
//     }
//     else{
//         res.send("Not include");
//     }
    
// });

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))