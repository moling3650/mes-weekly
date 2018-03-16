import axios from 'axios'

function fetchProcessOptions () {
  return axios.get('/DataAPI/Commom.ashx?ActType=GetProcessOptions').then(res => res.data)
}
function fetchWeeklyData (processCode, startDay, endDay) {
  const params = `processCode=${processCode}&startDate=${startDay}&endDate=${endDay}`
  return axios.get(`/DataAPI/Commom.ashx?ActType=GetWeeklyData&${params}`).then(res => res.data)
}

export {
  fetchProcessOptions,
  fetchWeeklyData
}
