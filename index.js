const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser()) 
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const reload = require('reload')

function hrefproxify(link, req) {
  let href2 = link;
  let linkhr;
  let type;
  let rel;
  let lhref;
    var href = link;
    href = href.replace('https://', '')
    if (!href.includes(req.cookies.url)) {
var t=0;   
href = href.replace(req.hostname, function (match) {
  t++;
  return (t === 2) ? req.cookies.url : match;
});
href = href.replace(req.hostname, req.cookies.url)
    }
    href = href.replace(req.hostname, req.cookies.url)
    let hashurl;
    if (href2.includes('#')) {
      href = href.split('#')
      hashurl = '#'+href[1]
      href = href[0]
    } else {
    }
    req.cookies.url = req.cookies.url + "/" 
    href = href.replace(req.hostname, req.cookies.url)
    if (hashurl) {
      req.cookies.url = req.cookies.url.replace('/', '')
      linkhr = '/surf/'+href+hashurl
    } else {
    linkhr = '/surf/'+href+'?real'
    }
    linkhr = linkhr.replace('//#', '#')
    linkhr = linkhr.replace('/#', '#')
    linkhr = linkhr.replace('about:blank', req.cookies.url)
    linkhr = linkhr.replace('/surf//', '/surf/'+req.cookies.url)
    linkhr = linkhr.replace(req.cookies.url+'/'+req.cookies.url, req.cookies.url+'/')
    linkhr = linkhr.replace('///////', '/')
    return linkhr.replace('///', '/');
  }

function scriptproxify(script, req) {
  let src = script;
     if (src.includes('/inject' || '/lodash')) {

    } else {
      if (src.includes('https://')) {
    src = src.replace('https://', '')
    script = script = '/surf/'+src
      } else {
    script = '/surf/'+req.cookies.url+'/'+src
    script = script.replace(req.hostname, req.cookies.url)
      }
      console.log(script)
          return script;
    }
}

function imageproxify(src, req) {
console.log('/surf/'+req.cookies.url+'/'+src)
return '/surf/'+req.cookies.url+'/'+src
}

function stylesheetproxify(link, req, rel) {
  let re = link
  console.log('/surf/'+re.replace('https://', ''))
  return '/surf/'+re.replace('https://', '')
}

function iconproxify(link, req, rel) {
  let re = link
  if (re.includes('https://')) {
    console.log('/surf/'+req.cookies.url+re)
    return '/surf/'+req.cookies.url+re
  } else {
    console.log('/surf/'+re)
    return '/surf/'+re
  }
}

function iframeproxify(src, req) {
  if (src.includes('https://')) {
    src = '/surf/'+src.replace('https://', '')
  }
  console.log(src)
  return src
}

function rewriteURL(body, cookieurl) {
  return body
}

function ext(url){
    var ext = url.substr(url.lastIndexOf('/') + 1),
        ext = ext.split('?')[0],
        ext = ext.split('#')[0],
        dot = ext.lastIndexOf('.');

    return dot > -1 ? ext.substring(dot + 1) : '';
}

function authenticate(req, res) {
  if (!req.cookies.url) {
    res.status(403)
  }
}

function proxifyhtml(req, code) {
    const dom = new JSDOM(code)
    //Rewrite all links
    dom.window.document.body.querySelectorAll('a').forEach(elem => {
      elem.href = hrefproxify(elem.href, req)
    })
    //Rewriting javascript script sources
    dom.window.document.querySelectorAll('script').forEach(elem => {
      elem.src = scriptproxify(elem.src, req)
    })
    //Rewriting stylesheet href
    dom.window.document.head.querySelectorAll("link[rel='stylesheet'").forEach(elem => {
      elem.href = stylesheetproxify(elem.href, req, elem.rel)
    })
    dom.window.document.head.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach(elem => {
      elem.href = iconproxify(elem.href, req, elem.rel)
      elem.href = elem.href.replace('/surf//', '/surf/'+req.cookies.url+'/')
    })
    //Rewriting image sources
    dom.window.document.body.querySelectorAll('img' ).forEach(elem => {
      elem.src = imageproxify(elem.src, req)
    })
    //Rewriting embed sources
    dom.window.document.body.querySelectorAll('iframe').forEach(elem => {
      elem.src = iframeproxify(elem.src, req)
    })
    let html = dom.window.document.documentElement.innerHTML
    html = html.replace('/surf//', '/surf/'+req.cookies.url+'/')
    return proxifyjs(req, html)
}

function proxifyjs(req, code) {
  //Rewriting Location.href
  code =   code.replace(/location.href = `/g, 'location.href = `/surf/'+req.cookies.url)
  code = code.replace(/document.location.href="/g, 'window.location.href = "/surf/'+req.cookies.url)
  code = code.replace(/location.href = '/g, "window.location.href = '/surf/"+req.cookies.url)
  code = code.replace(/document.location = '/g, "window.location.href = '/surf/"+req.cookies.url)

  //Rewriting Window.open
  code = code.replace(/window.open/g, 'wopen')

  //Rewriting Window.location.assign
  code = code.replace(/window.location.assign/g, 'wassign')
  return code
}

app.use(express.static(__dirname + '/public'))
const http = require('http')
const config = require('./config.json')
const fetch = require('node-fetch')
const parser = require('./parser')
let prefix = config.prefix
btoa = str => new Buffer.from(str).toString('base64'),
atob = str => new Buffer.from(str, 'base64').toString('utf-8')
  if(!prefix.includes("/", 2)) {
    prefix = prefix.replace("/", "")
    prefix = "/"+prefix+"/"
  }
    server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname})
})

app.get('/reroute', (req, res) => {
  var url = req.query.url
    if (url.includes('http://')) {
      url = url.replace('http://' || "https://", '')
    } else if (!url.includes('https://')) {
      url = url
    }
  res.redirect(prefix+url+'/')
})

app.get('/sess', (req, res) => {
  var url = req.query.url
    if (url.includes('http://')) {
      url = url.replace('http://' || "https://", '')
    } else if (!url.includes('https://')) {
      url = url
    }
  res.redirect(prefix+url+'/')
})

app.get(prefix+':url/:path?/:path2?/:path3?/:path4?/:path5?/:path6?/:path7?/:path8?', 
(req, res) => {
  if (req.url.includes('https/')) {
    res.redirect(req.url.replace('https/', ''))
  }
  authenticate(req, res)
  let url,url2,path,path2,path3,path4,path5,path6,path7,path8;path=req.params.path?req.params.path:"",path2=req.params.path2?"/"+req.params.path2:"",path3=req.params.path3?"/"+req.params.path3:"",path4=req.params.path4?req.params.path4:"",path5=req.params.path5?"/"+req.params.path5:"",path6=req.params.path6?req.params.path6:"",path7=req.params.path7?"/"+req.params.path7:"",path8=req.params.path8?req.params.path8:"";
    url = "https://"+req.params.url+'/'+path+path2+path3+path4+path5+path6+path7+path8
    fetch(url.replace('https/:', '')).then(function (res) {
        return res.text();
    }).then(function (text) {
      if(req.url.includes('real')) {
      res.clearCookie('url');
      console.log(req.cookies.url)
      res.cookie('url', req.params.url)
      }
var type = ext(url)
  let code = text
    
console.log(type)
if (type==='js') {
      res.setHeader('content-type', "text/javascript")
      res.send(proxifyjs(req, code))
} else if (type==='css') {
  res.setHeader('content-type', "text/css")
  res.send(code)
} else if (type==='svg') {
  res.setHeader('content-type', "image/svg+xml")
  res.send(code)
} else if (type==='jpg') {
  res.setHeader('content-type', "image/jpeg")
  res.send(code)
} else if (type==='png') {
  res.setHeader('content-type', "image/png")
  res.send(code)
} else if (type==='ico') {
  res.setHeader('content-type', 'image/x-icon')
  res.send(code)
} else {
  res.setHeader('content-type', "text/html")
  res.send(proxifyhtml(req, code) + '<script src="https://cdn.enderkingj.tk/inject.js"></script>')
}
});})

app.use((req, res) => {
  res.status(404, res.send('hello'))
})

app.listen(process.env.PORT || config.port)
console.log(`https://localhost:${process.env.PORT || config.port}`)