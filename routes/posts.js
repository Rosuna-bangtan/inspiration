var express = require('express');
var router = express.Router();
var database = require('./../config/db');
const { ObjectId } = require('mongodb');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const searchTerm = req.query.search;
    try {
        // 1. connect to database blog
        const blog = database.client.db('quotes');
        // 2. get collection "posts"
        const posts = blog.collection('Quotes');
        // 3. get all documents inside collection "posts" and match with collection "users"
        const allPosts = await posts
            .aggregate([
                {
                    $match: {
                        content: {
                            $regex: searchTerm,
                            $options: "i" // case-insensitive
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                {
                    $addFields: {
                        createdAt: {
                            $toDate: "$createdAt"
                        }
                    }
                },
                // Sort results
                { $sort: { createdAt: -1 } }, // 1 = ascending, -1 = descending,
            ])
            .toArray();

        console.log(allPosts);
        // 4. pass array to handlebars template
        res.json(allPosts)
    } catch (e) {
        console.log('An error occured', e);
    }
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    try {
        // 1. connect to database blog
        const blog = database.client.db('quotes');
        // 2. get collection "posts"
        const posts = blog.collection('Quotes');

        // 3. insert a new document into "posts"
        posts.insertOne({
            title: req.body.title,
           quote: req.body.quote,
        });

        res.send('Created new post successfully!');
    } catch (error) {
        console.log('An error occured', error);
        res.status(500).send('Your post was not successfully edited: ' + error);
    }
})

router.put('/:id', (req, res, next) => {
    try {
        // 1. connect to database blog
        const blog = database.client.db('blog');
        // 2. get collection "posts"
        const posts = blog.collection('posts');

        // 3. update document with id, and use $set to set the content
        posts.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { content: req.body.content } }
        );

        res.send('Updated new post successfully!');
    } catch (error) {
        console.log('An error occured', error);
        res.status(500).send('Your post was not successfully edited: ' + error);
    }
});

router.delete('/:id', (req, res, next) => {
    try {
        // 1. connect to database blog
        const blog = database.client.db('blog');
        // 2. get collection "posts"
        const posts = blog.collection('posts');

        // 3. delete this document with a matching id
        posts.deleteOne(
            { _id: new ObjectId(req.params.id) }
        );

        res.send('Deleted new post successfully!');
    } catch (error) {
        console.log('An error occured', error);
        res.status(500).send('Your post was not successfully deleted: ' + error);
    }
})

module.exports = router;
