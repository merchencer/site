const axios = require("axios").default

const getAccessToken = async (req, res, next) => {
    let options = { 
        method: 'POST',
        url: 'https://merchencer.us.auth0.com/oauth/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          grant_type: 'client_credentials',
          client_id: 'MNIRvek8cOgb1F7pG3FJaYEhxnNKVQS3',
          client_secret: process.env.CLIENT_SECRET,
          audience: 'https://merchencer.us.auth0.com/api/v2/'
        }
      }
      
      axios.request(options).then(function (response) {
        console.log(response)
        next() 
      }).catch(function (error) {
        console.error(error)
      })
}

module.exports = getAccessToken
