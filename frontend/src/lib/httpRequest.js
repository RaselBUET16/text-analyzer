import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL

export function createAbsoluteUrl (base, path) {
  if (String(base).endsWith('/')) {
    base = base.slice(0, -1)
  }
  if (String(path).startsWith('/')) {
    path = path.slice(1)
  }
  return `${base}/${path}`
}

export function sendGETRequest (url, timeout=5000) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  url = createAbsoluteUrl(API_URL, url)
  return axios.get(url, { headers, timeout })
}

export function sendPOSTRequest (url, body, timeout=5000) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  url = createAbsoluteUrl(API_URL, url)
  return axios.post(url, body, { headers, timeout })
}

export function sendPUTRequest (url, body) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  url = createAbsoluteUrl(API_URL, url)
  return axios.put(url, body, { headers })
}

export function sendDELETERequest (url) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  url = createAbsoluteUrl(API_URL, url)
  return axios.delete(url, { headers })
}

export function handleHTTPSuccess (res) {
  toast.success(res.data.message || "Success!");
}

export function handleHTTPError (error) {
  let title = 'HTTP Error';
  switch (error.status) {
    case 400:
      title = 'HTTP 400. Bad Request'
      break

    case 404:
      title = 'HTTP 404. Not Found'
      break

    case 500:
      title = 'HTTP 500. Internal Server Error'
      break

    default:
      title = error.response?.data?.message || 'HTTP Error'
      break
  }

  toast.error(title);
}