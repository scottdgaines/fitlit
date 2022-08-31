// Your fetch requests will live here!
const fetchData = (dataFileName, dataKey) => {
return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataFileName}`)
  .then(response => response.json())
  .then(data => data[dataKey])
};

export default fetchData
