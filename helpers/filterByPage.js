const { ENABLED, POSTS_ON_PAGE } = require('../constants/pagination');

module.exports = (posts, page = 1) => {
  if(!ENABLED) return posts;
  
  const firstIndex = (page - 1) * POSTS_ON_PAGE;
  const lastIndex = firstIndex + POSTS_ON_PAGE;

  return posts.slice(firstIndex, lastIndex);
};