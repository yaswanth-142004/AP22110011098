const express = require('express');

const axios = require('axios');

const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 9876;


const JWT_TOKEN = process.env.JWT_TOKEN ;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;
const TEST_SERVER_BASE_URL = 'http://20.244.56.144/test';


const response = await axios.get(`${TEST_SERVER_BASE_URL}/primes}`, {
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      signal: controller.signal
    });

console.log(response.data); 