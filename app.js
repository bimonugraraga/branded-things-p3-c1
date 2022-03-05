if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
  
}

var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
