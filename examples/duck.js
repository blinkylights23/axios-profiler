import axios from 'axios'
import axiosProfiler from '../src/index.js'

const profilerAxios = axiosProfiler(axios)

const getTheMoff = () => {
  return profilerAxios.get('https://duckduckgo.com/?q=grand+moff+tarkin&format=json&pretty=1')
}

getTheMoff().then(response => {
  console.log(JSON.stringify(response.headers['x-axios-duration'], null, 2))
})
