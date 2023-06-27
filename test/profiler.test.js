import axios from 'axios'
import axiosProfiler from '../src/index.js'

describe('axios-profiler', () => {
  it('should add some interceptors to axios', () => {
    const myAxios = axiosProfiler(axios)
    expect(myAxios.interceptors.request.handlers.length).toBe(1)
    expect(myAxios.interceptors.response.handlers.length).toBe(1)
  })
  it('should add some interceptors to a custom axios instance', () => {
    const myAxios = axios.create()
    axiosProfiler(myAxios)
    expect(myAxios.interceptors.request.handlers.length).toBe(1)
    expect(myAxios.interceptors.response.handlers.length).toBe(1)
  })
  it('should add a header to the response', async () => {
    const myAxios = axiosProfiler(axios)
    const response = await myAxios.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.headers['x-axios-duration']).toBeDefined()
  })
})
