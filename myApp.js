require('dotenv').config()
let bodyParser = require('body-parser')
var express = require('express');
var app = express();

viewsPath = __dirname + "/views/"
app.use("/public", express.static(__dirname + "/public"));
app.use("/controller", express.static(__dirname + '/controller'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    res.sendFile(viewsPath + "index.html");
 });

//  app.get('/json', function(req, res) {
//     if (process.env.MESSAGE_STYLE === "uppercase") {
//         response = "Hello json".toUpperCase();
//     }else {
//         response = "Hello json";
//     }
    
//     res.json({"message": response})
//  });


 app.get('/pendu', function(req, res) {
    res.sendFile(viewsPath + "game.html");
 });

 app.use('/json', function middleware(req, res, next){
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string)
    next()
 })

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
},
    function (req, res){
    res.send({time: req.time})
    }
)

app.get('/:word/echo', (req,res)=>{
    let { word } = req.params;
    res.json({echo: word})
})

app.get('/name', (req,res)=>{
    let {first: firstName , last: lastName} = req.query
    res.json({
        name:`${firstName} ${lastName}`
    })
})

app.post('/name', (req,res)=>{
    let string = req.body.first + " " + req.body.last
    res.json({ name: string });
})




















 module.exports = app;
