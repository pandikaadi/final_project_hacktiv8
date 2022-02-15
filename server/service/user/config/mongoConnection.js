const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

let mongoConnetion ;

async function connect () {
  try{
    const connection = await client.connect()
    const db = connection.db('shave8')
    mongoConnetion = db
  }catch(err){
    console.log(err);
    throw err
  }
}

function getMongoConnection (){
  return mongoConnetion
}

module.exports = {
  connect,
  getMongoConnection,
}