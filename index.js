const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const cases = JSON.parse(
  fs.readFileSync(`${__dirname}/cases.json`)
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/api/cases", (req, res) => {
  res.status(200).json({
    status: "success",
    results: cases.length,
    data: {
      cases
    }
  });
});

app.get("/api/cases/:region", (req, res) => {

  let searchCase = cases.find(el => el.region === req.params.region);
  if (!searchCase) return res.status(404).send("case with the given region not found");
  res.status(200).json({
    status: "success",
    
    data: {
      case : searchCase
    }
  });
});

app.post("/api/cases", (req, res) => {
  const newCase = {
    region: req.body.region,
    county: req.body.county,
    origin: req.body.origin
  };
  cases.push(newCase);
  fs.writeFile(`${__dirname}/cases.json`, JSON.stringify(cases), err=> {
    res.status(201).json({
      status: "success",     
      data: {
        case : newCase
      }
    });

  });
  
});




app.put("/api/cases/:region", (req, res) => {

  let searchCase = cases.find(el => el.region === req.params.region);
  
  if (!req.params.region) return res.status(404).send("case with the given region not found");  

  searchCase.region = req.body.region;
  searchCase.county = req.body.county;
  searchCase.origin = req.body.origin;
  
  fs.writeFile(`${__dirname}/cases.json`, JSON.stringify(cases), err => {
    res.status(201).json({
      status: "success",
      data: {
        case: cases
      }
    });

  });
 
});


app.delete("/api/cases/:region", (req, res) => {
  let searchCase = cases.find(el => el.region === req.params.region);
  if (!searchCase) return res.status(404).send("case with the given region not found");

  const index = cases.indexOf(searchCase);

  cases.splice(index, 1);

  fs.writeFile(`${__dirname}/cases.json`, JSON.stringify(cases), err => {
    res.status(201).json({
      status: "success",
      data: {
        case: cases
      }
    });
});

});
/*

app.post("/api/cases", (req, res) => {
  const { error } = validateCase(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  
  if (!req.body.region || req.body.region.length < 1) {
    res.status(400).send("name is required");
    return;
  }
  const newCase = {
    region: req.body.region,
    county: req.body.county,
    origin: req.body.origin
  };
  cases.push(newCase);
  res.send(newCase);
});

app.get("/api/cases/:region", (req, res) => {
  let searchCase = cases.find(c => c.region === req.params.region);
  if (!searchCase) return res.status(404).send("case with the given region not found");
  res.send(searchCase);
});

app.put("/api/cases/:region", (req, res) => {
  let searchCase = cases.find(c => c.region === req.params.region);
  if (!searchCase) return res.status(404).send("case with the given region not found");

  const { error } = validateCase(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  

  searchCase.region = req.body.region;
  res.send(searchCase);
});

app.delete("/api/cases/:region", (req, res) => {
  let searchCase = cases.find(c => c.region === req.params.region);
  if (!searchCase) return res.status(404).send("case with the given region not found");

  const index = cases.indexOf(searchCase);

  cases.splice(index, 1);

  res.send(searchCase);
});

function validateCase(newCase) {
  const schema = {
    region: Joi.string()
      .min(1)
      .required()
  };

  return Joi.validate(newCase, schema);
}

*/
