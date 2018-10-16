var express = require('express')
var app = express();
var path = require('path');

app.use(express.static('js'))
app.use(express.static('css'))

app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/pages', express.static(path.join(__dirname, 'pages')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(3031);