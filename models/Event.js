const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  category: { type: String, enum: ['Meetings', 'Birthdays', 'Appointments'], required: true },
  reminderStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', eventSchema);
