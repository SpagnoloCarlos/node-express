//  vamos a utilizar una dependencia como constante

/* const http = require("http");

const server = http.createServer((request, response) => {
    response.end("Hello world");
});

server.listen(8080, () => {
    console.log("Server is runing...");
});*/

// --------------------
/* setTimeout(() => {
        console.log("hello after 4 seconds");
    },
    4*1000  //el tiempo se expresa en milisegundos por
            //eso si queremos 4 segundos lo multiplicamos por 1000
);*/

// --------------------
//  Cada 3 segundo muestra el mensaje infinitamente

/* setInterval(() => {
    console.log("hello every 3 seconds");
    },
    3000
);

for (let i=0; i<1e3; i++){
    //nada
    console.log(i);
}*/

// -------------------

// hacer una funcion que escriba un mensaje
//  "hello after x seconds" despues de 4 s y despues de 8 s
// depende el numero que lo pasamos por parametro

/* function messageAfter(time){
    setTimeout(() => {
            console.log(`Hello after ${time} seconds`);
        },
        time*1000
    )
}

messageAfter(4);*/

// --------------------
// Clase 19

/* const api = require("./api.js");

const result = api.sum(5, 5);

console.log(result);*/

// -------------------
// Tratamiento de excepciones con Try catch

/* const fs = require("fs");  // file system

const fileNames = ["./api.js", "./package.json"];

fileNames.forEach(fileName => {
    try {
        const data = fs.readFileSync(fileName);
        console.log("File data is: ", data);
    }catch (err) {
        if (err.code === "ENOENT"){
            console.log("File not found", fileName);
        }else{
            throw err;
        }
    }
});*/

// ------------------
// Express

/* const express = require('express');
// hay que instalarlo con npm install express

const app = express();

const bookRouter = express.Router();

bookRouter.route('/books').get((req, res) => {
  const response = {
    hello: 'This is my API',
  };
  res.json(response);
});
app.use('/api', bookRouter);

/* const pies = [
  {'id': 1, 'name': 'apple'},
  {'id': 2, 'name': 'cherry'},
];

const response = { // objeto JSON
  'status': 201,
  'statusText': 'Resource created',
  'message': 'All pies retrieved',
  'data': pies,
};

app.get('/', (req, res) => {
  res.json(response);
});*/

/* app.get("/test", (req , res) => {
    res.send("Esto es una prueba!");
})*/


// app.listen(8080);

// ---------------------
// Clase 20
// end point

// ---------
// Clase 21, 22 y 23

const express = require('express'); 
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bodyParser = require('body-parser');   //body es el contenido del mensaje
const bookRouter = require('./routes/bookRouter')(Book);

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

//---- User ----
const User = require('./models/userModel');
const userRouter = require('./routes/userRouter')(User);
//--------------

const jwt = require('express-jwt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.all('/api/*', jwt({
    secret: 'secret',
    algorithms: ['HS256']
}).unless({
    path: ['/api/users/login']
}));

app.use('/api', bookRouter, userRouter);

//app.use('/api', userRouter); //userRouter, lo pongo en el mismo app.use arriba
app.listen(8080); 
// -----------------------


