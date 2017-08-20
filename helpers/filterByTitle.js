module.exports = (posts, query) => {
  const filteredPosts = [];
  const title = query.title.toLowerCase();

   posts.forEach((post) => {
    const postTitle = post.title.toLowerCase();
    const match = postTitle.match(title);

    if (match) filteredPosts.push(post);
  });

  return filteredPosts;
};