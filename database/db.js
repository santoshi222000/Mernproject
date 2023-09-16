const mongoose= require("mongoose");

const connection = async ()=>{
    const URL = `mongodb+srv://asset:compounder@asset.q0fes8d.mongodb.net/ASSETCOMPOUNDER`;

    try {
      await  mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
      console.log("connection successfully");
    } catch (error) {
        console.log("Database is  not connected", error);
    }
}

module.exports = {connection}