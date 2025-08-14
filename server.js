const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const { error } = require('console');
const PORT = 3000;
const CSV_FILE = path.join(__dirname, "public","data.csv");

//middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}))



app.post('/submit', (req, res) => {
    const task = req.body.task && req.body.task.trim();
    if(!task){
        return res.status(400).send('No task provided');
    }
    const newline = `${task}\n`;
    fs.appendFile(CSV_FILE, newline, (err) =>{
        if (err){
            console.error("Error writing to CSV: ", err);
            return res.status(500).send('Server error');
        }   
        res.redirect('/');
    });
});

app.get('/tasks', (req, res)=>{
    fs.readFile(CSV_FILE, 'utf-8', (err,data)=>{
        if (err) return res.status(500).send("Error reading file");
        res.send(data)
    });
});



app.listen(PORT, function(){
    console.log('My server is running on port 3000')
});




