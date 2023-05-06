const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();
const port = 3000;

const cors = require('cors');


const jsonParser = bodyParser.json()
 

const data = fs.readFileSync('data.json');
let jsonData = JSON.parse(data);

const getMaxUserID = () => {
    let maxID = 0
    jsonData.forEach(element => {
        if (element.id > maxID) {
            maxID = element.id
        }
    });
    return maxID
}

const allowedOrigins = ['*'];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

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

app.post('/data', jsonParser, (req, res) => {
  let dataToAdd = req.body

  let newUniqIDForUserToAdd = getMaxUserID() + 1
  dataToAdd["id"] = newUniqIDForUserToAdd
  jsonData.push(dataToAdd)

  lastAddedData = jsonData.filter(item => item.id === newUniqIDForUserToAdd)

  res.json(lastAddedData);
});


app.delete('/data/:id', (req, res) => {
  let id = req.params.id;

  jsonData = jsonData.filter((data) => data.id !== parseInt(id));
  console.log(jsonData)

  res.json("Row Deleted");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});