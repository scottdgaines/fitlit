// Your fetch requests will live here!
const fetchData = (dataFileName) =>
fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataFileName}`)
  .then(response => response.json())
  .then(data => data)

console.log('I will be a fetch request!')

export default { fetchData }
