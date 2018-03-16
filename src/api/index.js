import axios from 'axios'

function fetchProcessOptions () {
  return axios.get('/DataAPI/Commom.ashx?ActType=GetProcessOptions').then(res => res.data)
}

export {
  fetchProcessOptions
}
