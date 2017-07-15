var express = require('express');
var application = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var cors = require('cors');
var posts = require('./data').posts;

const port = 3001;

application.use(bodyParser.urlencoded({ extended: false }));
application.use(cors());
application.use(express.static('public'));

application.get('/', function(req, res) {
  res.json(posts);
});

application.get('/posts/:id', function(req, res) {
  const id = req.params.id;
  const index = posts.findIndex((post) => post.id == id);

  res.json(posts[index]);
});

application.put('/posts/:id/like', jsonParser, function(req, res) {
  const id = req.params.id;
  const index = posts.findIndex((post) => post.id == id);

  posts[index].meta.likesCount++;

  res.json(posts[index]);
});



application.listen(port, function() {
  console.log(`Server listening on the port: ${port}`)
});