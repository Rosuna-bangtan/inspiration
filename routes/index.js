var express = require('express');
var router = express.Router();
var database = require('./../config/db');
const { all } = require('.');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    // 1. connect to database blog
    const blog = database.client.db('quotes');
    // 2. get collection "posts"
    const posts = blog.collection('Quotes');
    // 3. get all documents inside collection "posts" and match with collection "users"
    const allPosts = await posts
      .find()
      .toArray();

    console.log(allPosts);
    // 4. pass array to handlebars template
    res.render('index', {
      title: 'Blog',
      posts: allPosts,
    });

  } catch (e) {
    console.log('An error occured', e);
  }
});

module.exports = router;