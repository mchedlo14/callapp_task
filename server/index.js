const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();
const port = 3000;

const cors = require('cors');

const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions));


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

app.get('/data',(req,res) => {
    res.json(jsonData)
})

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
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

app.put('/data/:id', jsonParser, (req, res) => {
  const id = req.params.id;
  let userUpdatedData = req.body

  jsonData.forEach(element => {
      if (element.id === parseInt(id)) {
        element.name = userUpdatedData.name
        element.email = userUpdatedData.email
        element.gender = userUpdatedData.gender
        element.address.street = userUpdatedData.address.street
        element.address.city  = userUpdatedData.address.city
        element.phone = userUpdatedData.phone
      }
  });

  lastAddedData = jsonData.filter(item => item.id === parseInt(id))

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