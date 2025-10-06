export function downloadFile(userId, payload = null) {
  fetch(import.meta.env.VITE_BASE_URL + `predicted/download`, {
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: userId
    },
    body: JSON.stringify(payload || {})
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
