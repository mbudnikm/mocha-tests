const baseUrl = 'http://localhost:3000'

const fetchGeo = () =>
    fetch(`${baseUrl}/geo`)
        .then(res => res.json())

const fetchOffices = () => 
    fetch(`${baseUrl}/offices`)
        .then(res => res.json())

module.exports = {
    fetchGeo,
    fetchOffices
}