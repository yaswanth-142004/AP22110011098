
  # AP22110011098

  This repository consists of the solutions for the **AFFORDMED Hiring Exam**.

  ## Overview

  This project implements a **Microservice API** that fetches numbers from a third-party test server and maintains a sliding window of unique numbers. The API calculates and returns the average of stored numbers while ensuring a response time of under 500 milliseconds.

  ---

  ## API Workflow

  1. The service fetches numbers from the test server API:
     ```
     http://20.244.56.144/test/{id}
     ```
     where the mapping is:
     ```javascript
     const number_map = {
       p: 'primes',
       f: 'fibo',
       e: 'even',
       r: 'rand'
     };
     ```

  2. The user sends a request from their local machine to:
     ```
     http://localhost:9876/numbers/{numberId}
     ```
     where `{numberId}` must be one of the allowed values (`p`, `f`, `e`, `r`).

  3. The service fetches numbers from the test server, stores them in a **single sliding window**, and ensures:
     - **Numbers remain unique**
     - **Older numbers are removed when the window exceeds its size (10)**
     - **Requests exceeding 500 ms or failing are ignored**
     - **The average of the stored numbers is computed**

  4. The API responds with the following JSON format:
     ```json
     {
       "windowPrevState": [1, 3, 5],
       "windowCurrState": [1, 3, 5, 7],
       "numbers": [7],
       "avg": 4.00
     }
     ```

  ---

  ## Installation & Setup

  ### Prerequisites
  Ensure you have **Node.js** installed on your system.

  ### Steps to Run the Service

  1. **Clone the Repository**
     ```bash
     git clone <repository-url>
     cd <repository-folder>
     ```

  2. **Install Dependencies**
     ```bash
     npm install
     ```

  3. **Set Up Environment Variables**
     Create a `.env` file in the root directory and set the following:
     ```
     JWT_TOKEN=<your-jwt-token>
     ```

  4. **Run the Microservice**
     ```bash
     node server.js
     ```

  5. **Test the API**
     Use **Postman** or a web browser to send a request:
     ```
     http://localhost:9876/numbers/p
     ```
     Replace `p` with `f`, `e`, or `r` to test different cases.

  ---

  ## Technologies Used

  - **Node.js**
  - **Express.js**
  - **Axios** (for HTTP requests)

  ---

  ## Author

  - **Name:** CANNOT INCLUDE AS PER THE COMPANY POLICY
  - **University:** SRM University, Andhra Pradesh
  - **GitHub:** [Your GitHub Profile](https://github.com/your-profile)

  ---

  ## License

  This project is licensed under the **MIT License**.
