# SliceLink
A simple and efficient URL Shortener built with **Node.js**, **Express**, and **MongoDB**.  
It allows users to input long URLs and generate shortened versions for easy sharing. 

## Features

- Shorten long URLs to easily shareable links
- Automatic redirection from shortened URLs to original URLs
- Track total number of links created
- Modern and responsive user interface
- Input validation for URLs

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript templating)
- jQuery
- Bootstrap

## Prerequisites

- Node.js (v10 or higher)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd URL-Shortener
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB:
   - Create a `.env` file in the root directory
   - Add your MongoDB URI:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000 (optional, defaults to 3000)
```

## API Endpoints

- `GET /` - Home page
- `POST /short` - Create a short URL
- `GET /r/:code` - Redirect to original URL

## License

This project is licensed under the ISC License.
