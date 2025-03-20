const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9876;
const JWT_TOKEN = process.env.JWT_TOKEN ;

const WINDOW_SIZE = 10;
const TIMEOUT = 500;
const TEST_SERVER_BASE_URL = 'http://20.244.56.144/test';

const number_map = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};


const numberWindow = new Set();


async function fetchNumbers(numberId) {
  if (!JWT_TOKEN) {
    console.error("JWT_TOKEN is not set.");
    return [];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await axios.get(`${TEST_SERVER_BASE_URL}/${number_map[numberId]}`, {
      headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${number_map[numberId]} numbers:`, error.message);
    return [];
  }
}

// API Endpoint
app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;

  if (!number_map[numberId]) {
    return res.status(400).json({ error: "Invalid numberId. Allowed values: p, f, e, r" });
  }

  const prevState = Array.from(numberWindow);
  const newNumbers = await fetchNumbers(numberId);

  for (const num of newNumbers) {
    if (!numberWindow.has(num)) {
      if (numberWindow.size >= WINDOW_SIZE) {
        numberWindow.delete([...numberWindow][0]); // Remove the  oldest number
      }
      numberWindow.add(num);
    }
  }

  const currState = Array.from(numberWindow);
  const avg = currState.length > 0 
    ? parseFloat((currState.reduce((sum, val) => sum + val, 0) / currState.length).toFixed(2))
    : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: newNumbers,
    avg: avg
  });
});

app.listen(PORT, () => {
  console.log(`Calculator Microservice running on http://localhost:${PORT}`);
});
