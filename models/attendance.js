const mongoose = require("mongoose");
const Schema = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  present: {
    type: Array,
  },
  absent: {
    type: Array,
  },
  holiday: {
    type: Array,
  },
});

const attendance = new mongoose.model("attendance", attendanceSchema);

module.exports = attendance;
