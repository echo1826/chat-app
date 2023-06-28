const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: {
    type: String,
    required: "No message inputted"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Message = model("Message", messageSchema);

module.exports = Message;