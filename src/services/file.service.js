export function downloadFile(userId) {
  fetch(window.apiUrl + `download/${userId}`, {
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-type': 'application/vnd.ms-excel'
    }
  })
    .then((res) => res.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'predicted_odds.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
}
