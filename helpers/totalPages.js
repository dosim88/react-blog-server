const { POSTS_ON_PAGE } = require('../constants/pagination');

module.exports = (count) => {
  return Math.ceil(count / POSTS_ON_PAGE);
};