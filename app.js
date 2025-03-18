const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./models/Event');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

// Example route to test
app.get('/', (req, res) => {
  res.send('Event Planner API');
});

app.post('/events', async (req, res) => {
  try {
    const { name, description, date, category } = req.body;
    const event = new Event({ name, description, date, category });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Error logging in' });
  }
});

app.get('/events', async (req, res) => {
  try {
    const { category, reminderStatus } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (reminderStatus !== undefined) filter.reminderStatus = reminderStatus;

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching events' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
