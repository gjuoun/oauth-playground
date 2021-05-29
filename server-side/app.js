const fs = require('fs')
const path = require('path')
const express = require('express')
const axios = require('axios')

const jsonFile = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./credentials.json")))

const oauthConfig = {
  clientId: jsonFile.web.client_id,
  clientSecret: jsonFile.web.client_secret,
  redirectUri: jsonFile.web.redirect_uris[0],
  authUri: jsonFile.web.auth_uri,
}

console.log(oauthConfig);

/* ------------------------------- google apis ------------------------------ */
// const oauth = google.oauth2()



/* ----------------------------- express server ----------------------------- */

const app = express()

app.use(express.json())

app.post('/oauth', (req, res) => {
  const body = req.body
 
  console.log(body);

  res.send('ok')
})

app.get('/oauth', async (req, res) => {
  const qs = req.query
  console.log("get /oauth", qs);

  const params = new URLSearchParams();
  params.append("code", qs["code"])
  params.append("client_id", oauthConfig.clientId)
  params.append("client_secret", oauthConfig.clientSecret)
  params.append("grant_type", "authorization_code")
  params.append("redirect_uri", oauthConfig.redirectUri)

  const response = await axios.post(`https://oauth2.googleapis.com/token`, params.toString())

  console.log("axios res: ", response);

  res.destroy()
})


app.get('/', (req, res) => {
  const searchParams = new URLSearchParams()
  searchParams.append("client_id", oauthConfig.clientId)
  searchParams.append("redirect_uri", oauthConfig.redirectUri)
  searchParams.append("response_type", "code")
  searchParams.append("scope",
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")
  searchParams.append("state", `{"mytoken":12345, "mytoken2": 1234565}`)
  // searchParams.append("state", `mytoken=12345 mytoken2=1234565`)
  searchParams.append("prompt", "consent")
  searchParams.append("access_type", "offline")

  const redirectUri = `${oauthConfig.authUri}?${searchParams.toString()}`
  console.log(redirectUri);

  res.redirect(redirectUri)
})


app.listen(3000, () => {
  console.log("listen on port 3000");
})

