# SliceLink

A simple and efficient URL Shortener built with **Node.js**, **Express**, and **MongoDB**. It allows users to input long URLs and generate shortened versions for easy sharing.

## Features

- Shorten long URLs to easily shareable links
- Automatic redirection from shortened URLs to original URLs
- Track total number of links created
- Modern and responsive user interface (Bootstrap, EJS)
- Input validation for URLs

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Frontend:** EJS, Bootstrap, jQuery

## Prerequisites

- Node.js (v10 or higher)
- MongoDB database (local or Atlas)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd URL-Shortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```
   - The app always runs on port 3000 unless you change it in `server.js`.

4. **Start the application:**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

- Go to the home page and enter a long URL in the input box.
- Click "Shorten URL" to generate a short link.
- Use the generated short link to redirect to the original URL.

## API Endpoints

- `GET /` — Home page with form and stats
- `POST /short` — Create a short URL (expects `{ url: <long_url> }` in body)
- `GET /r/:code` — Redirect to the original URL for a given short code

## Environment Variables

- `MONGODB_URI` — Your MongoDB connection string (required)
- `PORT` — Port number (default: 3000, can be changed in `.env` but must match `server.js`)

## Project Structure

- `server.js` — Main server file
- `models/ShortLink.js` — Mongoose schema for storing links
- `config/keys.js` — Loads MongoDB URI from environment
- `public/` — Static assets (CSS, JS)
- `views/` — EJS templates

## License

This project is licensed under the ISC License.
