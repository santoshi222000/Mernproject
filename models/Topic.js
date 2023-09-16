const mongoose= require("mongoose");

const chapterTopic = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  Topic: Array,

},{
    timestamps: true,
}

)

const Topic= mongoose.model('Topic', chapterTopic)

module.exports = Topic;