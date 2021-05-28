const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'))
const http = require('http')
const config = require('./config.json')
const fetch = require('node-fetch')
let prefix = config.prefix
btoa = str => new Buffer.from(str).toString('base64'),
atob = str => new Buffer.from(str, 'base64').toString('utf-8')
  if(prefix.includes("/", 2)) {
  }
  else {
    prefix = prefix.replace("/", "")
    prefix = "/"+prefix+"/"
  }
    server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname})
})

app.get('/reroute', (req, res) => {
  var url = atob(req.query.url)
      if (url.includes('https://')) {

    } else if (url.includes('http://')) {
      url = url.replace('http://', "https://")
    } else {
      url = "https://"+url
    }
  res.redirect(prefix+btoa(url)+'/')
})

app.get(prefix+':url/', (req, res) => {
    url = atob(req.params.url)
    console.log(url)
    fetch(url)
    .then(res => res.text())
    .then(body => res.send(body += "<script src='https://7b6b187c-af91-48b7-84bc-dae872584e4a.id.repl.co/assets/inject.js' type='text/javascript'></script>"))
})

server.listen(process.env.PORT || config.port)
console.log(`https://localhost:${process.env.PORT || config.port}`)