document.getElementById('initiate').addEventListener('click', function() {
  var url = document.getElementById('url')
  if (url.value) {
  window.location.assign(`/reroute?url=${btoa(url.value)}`)
  } else {
    alert('Please Insert a URL. It Does Not Need To Include http:// or https://')
  }
})

document.getElementById('url').addEventListener('keypress', function(key) {
  if (key.keyCode == 13) { 
  var url = document.getElementById('url')
  if (url.value) {
  window.location.assign(`/reroute?url=${btoa(url.value)}`)
  } else {
    alert('Please Insert a URL. It Does Not Need To Include http:// or https://')
  }
  }
})