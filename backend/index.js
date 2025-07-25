const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.EXCHANGE_API;

app.get('/api/rates/:base', async (req, res) => {
  const base = req.params.base;
  try {
    const response = await axios.get(`${BASE_URL}${base}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
