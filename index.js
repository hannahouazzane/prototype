const express = require("express");
const app = express();
let data ={}
app.use(express.json());
app.set("view engine", "ejs");
app.post("/form-data", (req, res) => {
  const data = req.body;

  if (data) {
    const stringifyData = JSON.stringify(data);
    const removeNewLine = stringifyData.replace(/\\n/g, "");
    const cleanResultData = removeNewLine.replace(/\\/g, "");
    console.log(cleanResultData);
  

    data[cleanResultData['userID']] = cleanResultData ;

   console.log(data);

    res.sendStatus(200);
  } else {
    res.status(400).send("Sorry something went wrong");
  }
});

app.listen(3001, () => {
  console.log("I am running on port 3001");
});


app.get("/response/:uuid", (req, res)=>{
  console.log('I have recieved a request')
  const uuid = req.params.uuid;
  if(data[uuid]) {
    const responseData = JSON.stringify(data[uuid]); 
    res.json(responseData)
  } else {
    res.status(500);
  }




})