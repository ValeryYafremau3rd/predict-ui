export function generateUserId() {
  return Math.floor(Math.random() * 1000000000)
}

export function getUserId() {
  return localStorage.getItem('userId')
}

export function setUserId(userId) {
  localStorage.setItem('userId', userId)
}

export default function checkUserId() {
  if (!getUserId()) {
    setUserId(generateUserId())
  }
}
