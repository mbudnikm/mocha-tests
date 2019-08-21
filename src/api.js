const baseUrl = 'http://localhost:3000'
const axios = require('axios')

const fetchGeo = () =>
    fetch(`${baseUrl}/geo`)
        .then(res => res.json())

const fetchOffices = () => 
    fetch(`${baseUrl}/offices`)
        .then(res => res.json())

const fetchGeoWithOffices = async () => {
    // SEQ - ok, but unnecessarily slow
    // const geo = await fetchGeo()
    // const offices = await fetchOffices()
    
    // CONCURRENT
    // ok, but requires to know promise API
    // const [ geo, offices ] = await Promise.all([ fetchGeo(), fetchOffices()])

    // the most flexible, not require to know promise API
    const geoReq = fetchGeo()
    const officesReq = fetchOffices()
    // 2 pending promises
    const geo = await geoReq
    const offices = await officesReq

    //console.log(Object.keys(geo), Object.keys(offices))

    const grouped = offices.reduce((acc, o) => {
        if (!acc[o.country]) {
          acc[o.country] = []
        }
        acc[o.country].push(o)
        return acc
      }, {})
    
      const result = Object.entries(geo)
        .reduce((acc, [code, country]) => {
          acc[code] = {
            country,
            offices: grouped[country]
          }
          return acc
        }, {})
      
      return result

}

const axiosGeo = () =>
  axios.get(`${baseUrl}/geo`)
    .then(res => res.data)

const axiosOffices = () =>
  axios.get(`${baseUrl}/offices`)
    .then(res => res.data)


module.exports = {
    baseUrl,
    fetchGeo,
    fetchOffices,
    fetchGeoWithOffices,
    axiosGeo,
    axiosOffices
}