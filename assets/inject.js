(function() {
var links = [].slice.apply(document.getElementsByTagName("a"));
var link = [].slice.apply(document.getElementsByTagName("link"));
var script = [].slice.apply(document.getElementsByTagName("script"));
var img = document.getElementsByTagName("img");
links.forEach(function(link) {
    var href = link.href;
    href = href.replace(document.location.host, cvalue('url'))
    link.href = '/web/'+btoa(href)+"/"
    href = link.href
    console.log(href)
})
link.forEach(function(link) {
    var href = link.href;
    if(href.includes('.css')) {
      link.type = "text/css"
      link.rel = "stylesheet"
    }
    href = href.replace(document.location.host, cvalue('url'))
    link.href = '/web/'+btoa(href)+"/"
    href = link.href
    console.log(href)
})
script.forEach(function(link) {
    var src = link.src;
    if (link.src) {
    src = src.replace(document.location.host, cvalue('url'))
    if (src.includes('socket.io')) {
      
    } else if (src.includes('/inject')) {

    } else {
    link.src = 'https://'+document.location.host+'/web/'+btoa(src)+"/"
    link.type = "text/javascript"
    }
    src = link.src
    } else {}
})
for (var i = 0; i < img.length; i++) {
    isrc = img[i].src
    img[i].src = isrc.replace(document.location.host, cvalue('url'))
    img[i].src = '/web/'+btoa(img[i].src)+'/'
    console.log(img[i].src)
}
html = document.getElementsByTagName('html')[0].innerHTML
document.getElementsByTagName('html')[0].innerHTML = html
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