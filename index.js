const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
        email:"tvvishnupriya@gmail.com",
        subscribed:"no"
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
    
 
  const Subscribeaction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://fe-yatmatch.demoserver.work/login",
        label: "Subscibe a Plan"
      }
  }

  const AddYachtaction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://fe-yatmatch.demoserver.work/login",
        label: "Add Yacht"
      }
  }

app.get('/dataFetchUrl',
 (req, res) => {
    const email = req.query.userEmail;
    const exists = users.some(el => el.email === email);
    if(!exists)
    {
        res.json(createProfileAction);
    }
    else{
       const sub =  users.filter(el => el.email === email).map(filteredObj => filteredObj.subscribed);
           if(sub == 'yes')
           {
            res.json(AddYachtaction);
           }
           else{
            res.json(Subscribeaction);
           }
           
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