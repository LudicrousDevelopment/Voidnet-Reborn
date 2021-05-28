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
  url = url.replace('https://' || 'http://', '')
  url = url.split('/', 3)
  url = url[0]
  alert(url)
  window.location.assign(`/reroute?url=${btoa(aurl)}`)
  document.cookie = "url="+url
  } else {
    alert('Please Insert a URL. It Does Not Need To Include http:// or https://')
  }
}