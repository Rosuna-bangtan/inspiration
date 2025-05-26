
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rosselynr:GJTgVAZJPXZ9KVAk@quotes.xko5vlu.mongodb.net/?retryWrites=true&w=majority&appName=QUOTES";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const databaseConnection = {
    client: client,
    run: async function() {
        try {
            const database = client.db('sample_mflix');
            const movies = database.collection('movies');
            // Query for a movie that has the title 'Back to the Future'
            const query = { year: 1903 };
            const movie = await movies.findOne(query);
            console.log(movie);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}

module.exports = databaseConnection;