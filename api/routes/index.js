require('dotenv').config()

const express           = require('express'),
      getAccessToken    = require('../middleware/getAccessToken'),
      router            = express.Router(),
      jwt               = require('express-jwt'),
      jwks              = require('jwks-rsa'),
      { authenticated } = require('../middleware/security')


router.get("/user", (req, res) => {
    console.log(req.cookies.token)
    let verify = jwt.verify(req.cookies.token, jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://merchencer.us.auth0.com/.well-known/jwks.json'
    }))
    console.log(verify)
})

router.post("/update", authenticated, getAccessToken, (req, res) => {
    let data = req.access_token
    // console.log(data)
})


module.exports = router 