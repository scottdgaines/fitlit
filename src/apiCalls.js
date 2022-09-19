const fetchData = (dataFileName, dataKey) => {
return fetch(`http://localhost:3001/api/v1/${dataFileName}`)
  .then(response => response.json())
  .then(data => data[dataKey])
};

const fetchPost = (url, initObject) => {
  return fetch(`http://localhost:3001/api/v1/${url}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(initObject)
  })
    .then(response => handleErrors(response))
    .then(response => response.json())
    .catch(err => showErrorMessage())
};

function handleErrors(response) {
  if (!response.ok) {
    console.log('hi', response.ok)
    throw Error(response.statusText);
  } else {
    console.log('jello')
  return response;
  }
}

function showErrorMessage() {
 alert('There was an error!')
}

export { fetchData, fetchPost }
