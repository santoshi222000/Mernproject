const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const multer = require("multer")
const path = require("path")

const cors = require('cors')


const  course = require("./routes/route")
const  user = require("./routes/user");
const  content = require("./routes/content");
const {connection } = require('./database/db');
const errorHandler = require('./middleware/errorHandler');

// Middleware




connection();


app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(express.json());
app.use(cors())

app.use(errorHandler)


const storage = multer.diskStorage({
  destination: (req, file,cb)=>{
    cb(null, "public/images");
  },

  filename: (req, file, cb)=>{
    cb(null, req.body.name);
  }
})

const upload = multer(storage);
app.post("/api/upload",upload.single("file"), (req, res)=>{
  try {
    return res.status(200).json("File uploaded sucessfully")
  } catch (error) {
    console.log(error);
  }
})

app.use("/api/route",course );
app.use("/api/user",user );
app.use("/api/content",content );


app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
