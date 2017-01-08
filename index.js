var app = require('express')();
var users = require('./users');
var mongojs = require('./db');
var db = mongojs.connect;

var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});

// app.get('/', function (req, res) {
//     res.send('<h1>Hello Node.js</h1>');
// });

app.get('/', function (req, res) {
    var res1;
    console.info('insertDB1');
    db.users.count(function(err, result) {
        console.info('insertDB2');
        if (result <= 0) {
            db.users.insert(users.findAll(), function(err, docs) {
                // insert new data.
            });
        }
        db.users.find({id:1},function (err,docs) {
            console.log('err',err);
            console.log('docs',docs);
        });
        res.send('<h1>Hello Node.js</h1>');
    });

});

// app.get('/user', function (req, res) {
//     res.json(users.findAll());
// });

app.get('/user', function (req, res) {
    db.users.find(function(err, docs) {
        res.json(docs);
    });
});

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    console.log('req.body',req.body);
    res.send('Add new ' + json.name + ' Completed!');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

