const mongoose= require("mongoose");

const courseContent = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  content: String,
  course: String,
  topic: Array,

},{
    timestamps: true,
}

)

const Content= mongoose.model('Content', courseContent)

module.exports = Content;