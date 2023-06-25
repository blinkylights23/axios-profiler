const getStartTime = () => process.hrtime()
const getEndTime = startTime => {
  const endTime = process.hrtime(startTime)
  return Math.round(endTime[0] * 1000 + endTime[1] / 1000000)
}

export default function axiosProfiler(axios) {
  axios.interceptors.request.use(config => {
    const newConfig = {
      ...config,
      metadata: { startTime: getStartTime() }
    }
    return newConfig
  })
  axios.interceptors.response.use(response => {
    const { startTime } = response.config.metadata
    const endTime = getEndTime(startTime)
    response.config.metadata.duration = endTime
    response.headers['x-axios-duration'] = endTime
    return response
  })
  return axios
}
