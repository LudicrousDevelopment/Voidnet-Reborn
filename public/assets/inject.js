(function() {
let links = document.getElementsByTagName("a");
links = Array.prototype.slice.call( links, 0 );
let link = document.getElementsByTagName("link");
link = Array.prototype.slice.call( link, 0 );
let script = document.getElementsByTagName("script");
script = Array.prototype.slice.call( script, 0 );
let img = document.getElementsByTagName("img");
img = Array.prototype.slice.call( img, 0 );
let btn = document.getElementsByTagName("button");
btn = Array.prototype.slice.call( btn, 0 );
let div = document.getElementsByTagName("div");
div = Array.prototype.slice.call( div, 0 );
links.forEach(function(link) {
  let type;
  let rel;
  let lhref;
    var href = link.href;
    href = href.replace('https://', '')
    if (!href.includes(cvalue('url'))) {
var t=0;   
href = href.replace(window.location.host, function (match) {
  t++;
  return (t === 2) ? cvalue('url') : match;
});
href = href.replace(window.location.host, cvalue('url'))
    }
    href = href.replace(window.location.host, cvalue('url'))
    let hashurl;
    if (link.href.includes('#')) {
      href = href.split('#')
      hashurl = '#'+href[1]
      href = href[0]
    } else {
      hashurl = ''
    }
    href = href.replace(window.location.host, cvalue('url'))
    link.href = '/surf/'+href+hashurl
    lhref = link.href
})
script.forEach(function(link) {
  let src = link.src
  let llink = document.createElement('script')
     if (src.includes('/inject' || '/lodash')) {

    } else {
    src = src.replace('https://', '')
    link.src = '/surf/'+src
    let lhref;
    lhref = link.src
    lhref = lhref.replace(window.location.host, cvalue('url'))
    llink.type = 'text/javascript';
    llink.src = lhref;
    }
    document.body.appendChild(llink)
})
for (var i = 0; i < img.length; i++) {
  let type;
    isrc = img[i].src
    img[i].src = isrc.replace(document.location.host, cvalue('url'))
    img[i].src = '/surf/'+img[i].src+'/'
    var imag = document.createElement('img')
    imag.src = img[i].src
    imag.id = img[i].id
    imag.classList = img[i].classList
    if(isrc.includes('.svg')) {
      type = "image/svg+xml"
    } if (isrc.includes('.png')) {
      type = "image/png"
    } if (isrc.includes('.jpg')) {
      type = "image/jpeg"
    }
    imag.type = type
    imag.src = imag.src.replace('https://'+window.location.host, '')
    imag.src = imag.src.replace('https://', '')
    img[i].remove()
    document.body.appendChild(imag)
    console.log(imag.src)
}
var path = window.location.pathname.replace('/surf/', '')
path = path.replace('/', '')
console.log(path)
path = path.split('/')
document.cookie = 'url='+path[0]
})()

function cvalue(cg) {
  var name = cg + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function wopen(url) {
  url = url.replace('https://', '')
  url = '/surf'
  window.open(url)
}