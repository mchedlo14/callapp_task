const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const cors = require('cors');

// app.use(cors)

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));



// Read data from JSON file
let data = fs.readFileSync('data.json');
let jsonData = JSON.parse(data);

app.get('/data',(req,res) => {
    res.json(jsonData)
})


app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id )    
    const filteredData = jsonData.filter(item => item.id === parseInt(id));
    if (filteredData.length > 0) {
        res.json(filteredData[0]);
    } else {
        res.status(404).json({ message: `No data found with id ${id}` });
    }
});

app.post('/data', (req, res) => {
  // Get new data from request body
  let newData = req.body;

  // Add new data to JSON data
  jsonData.push(newData);

  // Write updated data to file
  fs.writeFileSync('data.json', JSON.stringify(jsonData));

  res.json(jsonData);
});

app.put('/data/:id', (req, res) => {
  // Get data ID from URL parameter
  let id = req.params.id;

  // Get updated data from request body
  let updatedData = req.body;

  // Find data by ID and update it
  jsonData.forEach((data, index) => {
    if (data.id === id) {
      jsonData[index] = updatedData;
    }
  });

  // Write updated data to file
  fs.writeFileSync('data.json', JSON.stringify(jsonData));

  // Find the updated data by ID and return it as the response
  let changedData = jsonData.find((data) => data.id === id);
  res.json(changedData);
});

app.delete('/data/:id', (req, res) => {
  // Get data ID from URL parameter
  let id = req.params.id;

  // Find data by ID and remove it
  jsonData = jsonData.filter((data) => data.id !== id);

  // Write updated data to file
  fs.writeFileSync('data.json', JSON.stringify(jsonData));

  res.json(jsonData);
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});