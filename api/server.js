require('dotenv').config()

const express           = require('express'),
      mongoose          = require('mongoose'),
      passport          = require('passport'),
      LocalStrategy     = require('passport-local'),
      app               = express(),
      cors              = require('cors'),
      path              = require('path'),
      logger            = require('morgan'),
      indexRoutes       = require('./routes/index'),
      User              = require("./models/user"),
      cookieParser      = require('cookie-parser'),
      { authenticated } = require('./middleware/security')

mongoose.connect('mongodb://localhost:27017/merch', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client/public')))

app.use(require('express-session')({
    secret: process.env.LOGIN_SERVER_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/authenticate", authenticated, (req, res) => {
    res.send("Approved")
})

app.use("/api", indexRoutes)

app.listen(process.env.PORT, () => {console.log(`server started on port ${process.env.PORT}`)})

