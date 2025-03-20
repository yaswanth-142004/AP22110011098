
const   express = require('express');
const app = express();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN


const PORT = process.env.PORT || 9876;


app.use(express.json());


const WINDOW_SIZE = 10;
const TIMEOUT = 500; 
const TEST_SERVER_BASE_URL = 'http://20.244.56.144/test'; 

const numberWindows = {
  p: [], // prime
  f: [], // fibonacci
  e: [], // even
  r: []  // random numbers
};
const number_map = {
    p: 'primes',
    f: 'fibo',
    e: 'even',
    r: 'rand'
}

// fetching numbers from third party server
async function fetchNumbersFromTestServer(numberId) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    
    
    const response = await axios.get(`${TEST_SERVER_URL}/${number_map[numberId]}`, {
        headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`
        },
        signal: controller.signal
      });
  
      clearTimeout(timeoutId);
      return response.data.numbers;
    } catch (error) {
      console.error(`Error fetching ${type} numbers:`, error.message);
      return [];
    }
  };
  


app.get('/numbers/:numberID', async (req, res) => {
  const { numberId } = req.params;
  

  
  try {
    
    const prevState = [...numberWindows[numberId]];
    
    
    const result = await fetchNumbersFromTestServer(numberId);
    const numbers = result.numbers || [];
    
    
    if (numbers.length > 0) {
      
      for (const num of numbers) {
        if (!numberWindows[numberId].includes(num)) {
          if (numberWindows[numberId].length >= WINDOW_SIZE) {
            numberWindows[numberId].shift(); 
          }
          numberWindows[numberId].push(num);
        }
      }
    }
    
    
    const avg = numberWindows[numberId].length > 0 
      ? parseFloat((numberWindows[numberId].reduce((a, b) => a + b, 0) / numberWindows[numberId].length).toFixed(2))
      : 0;
    
    
    res.json({
      windowPrevState: prevState,
      windowCurrState: numberWindows[numberId],
      numbers: numbers,
      avg: avg
    });
    
  } catch (error) {
    console.error('processing error:', error.message);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Calculator Microservice running on http://localhost:${PORT}`);
});
