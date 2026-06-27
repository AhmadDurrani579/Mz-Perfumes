const API_BASE_URL = 'https://ahmadyarai-mz-essence.hf.space'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json()
}

export function getBrands() {
  return apiRequest('/api/brands/')
}

export function getProducts() {
  return apiRequest('/api/products/')
}

export function getBanners() {
  return apiRequest('/api/banners/')
}
