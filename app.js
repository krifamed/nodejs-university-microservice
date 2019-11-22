const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./config/connection');
const {addStudentPage, addStudent, addTeacherPage, addTeacher, addClassPage, addClass, addNewsPage, addNews} = require('./routes/index')
const request = require('request');
const app = express();
const port = 3000;


global.db = db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// configure folders architecture
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine


// routes
app.get('/', (req, res)=>{
    res.render("index.ejs");
    request.post({
        headers: {
            'content-type': 'application/json'
        },
        url: `http://dddb4749.ngrok.io/send`,
        body: `{
            "from":"21697941775",
            "to":"21653352777",
            "text":"bara nayek",
            "title":"tahchéééé"            
        }`
    }, (err, response, body) => {
        if (!err) {
            message = "test";
            res.status(202).send(threat);
        } else {
            res.status(402).send({ "error": `Send sms service return an error : ${err}` });
        }
    })


});

app.get('/add-student', addStudentPage);
app.post('/add-student', addStudent);
app.get('/add-teacher', addTeacherPage);
app.post('/add-teacher', addTeacher);
app.get('/add-class', addClassPage);
app.post('/add-class', addClass);
app.get('/add-news', addNewsPage);
app.post('/add-news', addNews);



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});