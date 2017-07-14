var express = require('express');
var application = express();

var cors = require('cors');
var posts = require('./data').posts;

const port = 3001;

application.use(cors());

application.get('/', function(req, res) {
  res.json(posts);
});

application.get('/posts/:id', function(req, res) {
  const id = req.params.id;
  const index = posts.findIndex((post) => post.id == id);

  res.json(posts[index]);
});

application.listen(port, function() {
  console.log(`Server on ${port}`)
});