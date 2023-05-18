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
    results: [],
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://example.com/create-iframe-contents",
        label: "Add to Yatmatch"
      }
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
        res.json('Not include');
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