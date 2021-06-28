document.getElementById('initiate').addEventListener('click', function() {
  go()
})

document.getElementById('url').addEventListener('keypress', function(key) {
  if (key.keyCode == 13) { 
    go()
  }
})

function go() {
  var url = document.getElementById('url')
  if (url.value) {
  aurl = url.value
  url = url.value
  url = url.replace('https://', '')
  url = url.replace('http://', '')
  url = url.replace('https/', '')
  aurl = url
  url = url.split('/')
  url = url[0]
  location.href = `/reroute?url=${aurl}`
  document.cookie = "url="+url
  } else {
    alert('Please Insert a URL. It Does Not Need To Include http:// or https://')
  }
}