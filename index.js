const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express();

//middleware
app.use(cors())
app.use(express.json())





//test
app.get('/', async(req, res )=> {
    res.send('Todo app portal running')
})

app.listen(port, () => console.log(`Todo app portal running on ${port}`))