const express = require('express');
const application = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const cors = require('cors');
const posts = require('./data').posts;

const filterByPage = require('./helpers/filterByPage');
const filterByTitle = require('./helpers/filterByTitle');
const totalPages = require('./helpers/totalPages');

const port = 3001;


application.use(bodyParser.urlencoded({ extended: false }));
application.use(cors());
application.use(express.static('public'));


application.get('/', function(req, res) {
  let filteredPosts = filterByPage(posts);

  res.json({
    entries: filteredPosts,
    currentPage: 1,
    totalPages: totalPages(posts.length)
  });
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

application.get('/pages/:page', jsonParser, function(req, res) {
  const page = +req.params.page;
  let filteredPosts = filterByPage(posts, page);

  res.json({
    entries: filteredPosts,
    currentPage: page,
    totalPages: totalPages(posts.length)
  });
});

application.get('/search/', function(req, res) {
  let filteredPosts = filterByTitle(posts, req.query);

  res.json({
    entries: filteredPosts,
    totalPages: totalPages(posts.length)
  });

});


application.listen(port, function() {
  console.log(`Server listening on the port: ${port}`)
});