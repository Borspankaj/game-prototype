const { MongoClient } = require('mongodb');
const dbClient = new MongoClient(yourConnectionURI);
await dbClient.connect();

module.exports = { dbClient }