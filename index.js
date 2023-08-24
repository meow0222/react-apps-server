// Import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Instance
const app = express();
const port = 8080;
const textBodyParser = bodyParser.text({
    limit: '20mb', 
    defaultCharset: 'utf-8'
});

/*
// Modules
const { authenticateUser } = require('./my_modules/login.js');
const { createDeck, createPlayers } = require('./my_modules/module-hyerim.js');
const { calculateReward, handleBetClick } = require('./my_modules/module-mao.js')

// CORS
// app.use(cors({
//     origin: 'http://localhost:8080'
// }));
*/

app.use(cors());
// var corsOptions = {
//     origin: "http://localhost:8080"
//   };
  
//   app.use(cors(corsOptions));
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Custom Header
app.options('/', (req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'casino');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.sendStatus(200);
});

/*
// GET for Login
app.get('/login',textBodyParser, async function(req, res){
    // Print the HTTP request headers
    console.log('req.headers: ', req.headers);

    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['casino'];

    console.log("Request from" + reqOrigin + "for route" + req.url + "with method " + req.method + "for task" + reqTask);

    // TASK Check
    if (reqTask === 'login') {
        try {
            const loginResult = await authenticateUser(req);
            console.log('authenticateUser result: ', loginResult);
            if(loginResult == true) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Expose-Headers', 'request-result');
                res.setHeader('request-result', 'Request ' + req.method + ' was received successfully');
                res.status(200).send("Login Successful");
            } else {
                res.status(403).send("Login Failed");
            }
        } catch(error) {
            console.log("authenticateUser error: ", error);
            res.status(500).send("Server Error");
        }
    }
    res.end();
});

// GET for Blackjack
app.get('/blackjack', async function(req, res) {
    console.log('req.headers: ', req.headers);

    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['casino'];
    console.log("Request from: " + reqOrigin + " for route: " + req.url + " with method: " + req.method + " for task: " + reqTask);

    if (reqTask === 'blackjack') {
        try {
            const deck = createDeck();
            const players = createPlayers(2);
            console.log(deck);
            
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Expose-Headers', 'request-result');
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully');
            res.status(200).json({ players, deck });
            
        } catch(error) {
            console.log("authenticateUser error: ", error);
            res.status(500).send("Server Error");
        }
    }

});


// POST for Signup
app.post('/login', async function(req, res) {
    console.log('req.headers: ', req.headers);

    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['casino'];
    const reqBody = req.body;

    console.log("Request from" + reqOrigin + "for route" + req.url + "with method " + req.method + "for task" + reqTask);
    console.log(reqBody);

    if (reqTask === 'signup') {
        try {
            const filePath = './data/users.json';
            const username = reqBody.username;
            const password = reqBody.password;
            await addUser(filePath, username, password);
        } catch(error) {
            console.log("error: ", error);
            res.status(500).send("Server Error");
        }
    }
});
*/

// Listen
app.listen(port, (err)=>{
    if(err) {
        console.log('There was a problem: ', err);
        return;
    }
    console.log(`Server listening on http://localhost:${port}`);
});


/*
//get for slotmachine
app.get('/api/todos', async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    
    if (reqTask === 'bet-coin') {
        try {
            const betClick = handleBetClick;
            const reward = calculateReward;
            console.log("handleBetClick returned betClick: ", betClick);
            console.log("calculateRward returned betClick: ", reward);


            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Expose-Headers', 'request-result');
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully');
            res.status(200);
            
        } catch(error) {
            console.log("authenticateUser error: ", error);
            res.status(500).send("Server Error");
        }
    }

});
*/

app.get('/api/todos', async (req, res) => {
    try {
      const todosData = await fs.promises.readFile('./api/todos.json');
      const todos = JSON.parse(todosData);
      console.log(todos);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(todos);
    } catch (error) {
      console.error('Error loading todos:', error);
      res.status(500).json({ error: 'Error loading todos' });
    }
  });
  
  
  app.put('/api/todos', async (req, res) => {
    const newTodos = req.body;
    try {
    await fs.promises.writeFile('./api/todos.json', JSON.stringify(newTodos));
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json({ message: 'Todos updated successfully' });
    } catch (error) {
      console.error('Error updating todos:', error);
      res.status(500).json({ error: 'Error updating todos' });
    }
  });
  
  app.post('/api/todos', async (req, res) => {
    const newTodo = req.body;
    try {
    console.log(req.body);
      const todosData = await fs.promises.readFile('./api/todos.json');
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
      const todos = JSON.parse(todosData);
      todos.push(newTodo);
    await fs.promises.writeFile('./api/todos.json', JSON.stringify(todos, null, 2));
     
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error adding new todo:', error);
      res.status(500).json({ error: 'Error adding new todo' });
    }
  });
  



