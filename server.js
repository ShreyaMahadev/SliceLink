// URL Shortener using Node.js, Express, MongoDB
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');
const validUrl = require('valid-url');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set public folder for assets
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

// Mongoose model
const ShortLink = require('./models/ShortLink');

// Home route
app.get('/', async (req, res) => {
  try {
    const count = await ShortLink.countDocuments({});
    res.render('index', { total_links: count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Generate random short code
function getRandomCode(length = 10) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97); // a-z
  }
  return code;
}

// POST: Generate short link
app.post('/short', async (req, res) => {
  const url = req.body.url;

  if (!validUrl.isUri(url)) {
    return res.status(400).json('Invalid URL');
  }

  let short_link = getRandomCode();

  // Check for duplicate short_link
  while (await ShortLink.findOne({ short_link })) {
    short_link = getRandomCode();
  }

  const newShortLink = new ShortLink({
    real_link: url,
    short_link: short_link,
    ip: req.ip
  });

  try {
    const savedLink = await newShortLink.save();
    res.status(200).json(`${req.headers.host}/r/${savedLink.short_link}`);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// GET: Redirect short link
app.get('/r/:code', async (req, res) => {
  try {
    const link = await ShortLink.findOne({ short_link: req.params.code });
    if (!link) {
      return res.status(404).send('Short link not found');
    }
    res.redirect(link.real_link);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 404 Fallback route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port: 3000');
});
