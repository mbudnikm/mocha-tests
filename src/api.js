const baseUrl = 'http://localhost:3000'

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

    

}

module.exports = {
    fetchGeo,
    fetchOffices,
    fetchGeoWithOffices
}