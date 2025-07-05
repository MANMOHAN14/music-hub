import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8080/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (email: string, password: string, name?: string) =>
    api.post('/auth/register', { email, password, name }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
}

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: { name: string; description?: string }) =>
    api.post('/projects', data),
  update: (id: string, data: { name?: string; description?: string }) =>
    api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
}

// Branches API
export const branchesAPI = {
  getByProject: (projectId: string) =>
    api.get(`/projects/${projectId}/branches`),
  create: (projectId: string, data: { name: string }) =>
    api.post(`/projects/${projectId}/branches`, data),
  delete: (projectId: string, branchId: string) =>
    api.delete(`/projects/${projectId}/branches/${branchId}`),
}

// Commits API
export const commitsAPI = {
  getByBranch: (projectId: string, branchId: string) =>
    api.get(`/projects/${projectId}/branches/${branchId}/commits`),
  create: (projectId: string, branchId: string, data: { message: string }) =>
    api.post(`/projects/${projectId}/branches/${branchId}/commits`, data),
}

// Comments API
export const commentsAPI = {
  getByCommit: (commitId: string) =>
    api.get(`/commits/${commitId}/comments`),
  create: (commitId: string, data: { content: string }) =>
    api.post(`/commits/${commitId}/comments`, data),
  delete: (commentId: string) =>
    api.delete(`/comments/${commentId}`),
}

export default api