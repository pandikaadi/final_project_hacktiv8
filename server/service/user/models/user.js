const { getMongoConnection } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const { createHash } = require("../helpers/bcrypt");

class User {
  static findAll() {
    const db = getMongoConnection();
    return db.collection("users").find({}).toArray();
  }

  static findOne(id) {
      const db = getMongoConnection();
      return db.collection("users").findOne({ id: Number(id) });
  }
  static findOneCompare(email){
    const db = getMongoConnection();
    return db.collection("users").findOne({ email: email });
  }
  static create(user) {
    user.password = createHash(user.password);
    user.role = "Customer";
    const db = getMongoConnection();
    return db.collection("users").insertOne(user);
  }

  static destroy(id) {
    const db = getMongoConnection();
    return db.collection("users").deleteOne({ id: Number(id) });
  }

  static update(id,location){
    const db = getMongoConnection();
    return db.collection("users").updateOne({
      id:Number(id)
    },{
      $set:{
        lat: location.lat,
        long: location.long
      }
    }
    )
  }
}

module.exports = User;