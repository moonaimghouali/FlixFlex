//modules imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")





//app initialization
const app = express()
app.use(express.json()) // middleware for handeling json data
app.use(cors({
  origin: '*'
}));


//port number
const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})


 


