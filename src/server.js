//modules imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const {userLogin, addToFav, deletetFromFav, getFav} = require('./controllers/user')
const {getMedia, searchMedia, getMediaDetails, getMediaTrailer} = require('./controllers/media')


//app initialization
const app = express()
app.use(express.json()) // middleware for handeling json data
app.use(cors({
  origin: '*'
}));


// app routes 
// user's routes
app.post('/api/user/login', userLogin)
app.post('/api/user/:id/favourite', addToFav) 
app.delete('/api/user/:id/favourite', deletetFromFav) 
app.get('/api/user/:id/favourite', getFav) 

// media routes
app.get('/api/media', getMedia)
app.get('/api/media/search', searchMedia)
app.get('/api/media/:id/details', getMediaDetails)
app.get('/api/media/:id/trailer', getMediaTrailer)





//port number
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})


 


