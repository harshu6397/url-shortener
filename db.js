const mongoose = require('mongoose')

class DB{
  constructor() {
    this.mongoUri = "mongodb://localhost:27018/short-url"
    this.connectDB(this.mongoUri)
  }

  async connectDB(uri) {
    try{
      await mongoose.connect(uri)
      console.log("DB is connected!")
    } catch (error) {
      console.log("Error: ", error)
    }
  }
}

return new DB();