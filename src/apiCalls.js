const fetchData = (dataFileName, dataKey) => {
return fetch(`http://localhost:3001/api/v1/${dataFileName}`)
  .then(response => response.json())
  .then(data => data[dataKey])
  // .catch(err => showErrorMessage())
};

const fetchPost = (url, initObject) => {
  return fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(initObject)
  })
    .then(response => response.json())
    .then(data => confirmationMessage())
    // .catch(err => showErrorMessage())
};

export { fetchData, fetchPost }
