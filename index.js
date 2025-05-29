const express = require('express')
const methodOverride = require('method-override')
const multer  = require('multer')
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const database = require("./config/database")

const systemConfig = require("./config/systems")

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")

database.connect()

const app = express()
const port = process.env.PORT

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './views')
app.set('view engine', 'pug')

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'))

// Flash
app.use(cookieParser('JKSLSF'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Routes
routeAdmin(app)
route(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})