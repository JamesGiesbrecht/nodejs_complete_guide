const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', 'views') //  Explicity setting the views directory, views is also the default

const adminData = require('./routes/admin')
const shopData = require('./routes/shop')

//  Third party middleware to parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//  Importing routes to app.js, the order still matters
app.use('/admin', adminData.routes) // Filtering admin routes with a /admin in the url
app.use(shopData.routes)

app.use((req, res) => {
  res.status(404).render('404', { docTitle: 'Page Not Found' })
})

app.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is live on port ${PORT}`)
