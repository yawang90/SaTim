const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Enable CORS
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || '*', // Replace * with your frontend URL in production
}));

app.use(express.json());

// Example route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
