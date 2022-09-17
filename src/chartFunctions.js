function renderSleepChart(data, dates) {
  const chartLayout = document.getElementById('myChart');
  const dataSet1 = data[0];
  const dataSet2 = data[1];

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Hours slept',
              data: dataSet1,
              backgroundColor: [
                '#8892B3',
              ],
            borderColor: [
                '#88B3B3',
              ],
              borderWidth: 1
          },
          {
              label: 'Sleep quality (out of 5)',
              data: dataSet2,
              backgroundColor: [
                  '#D6C2FF'
              ],
              borderColor: [
                  '#5F6E7D'
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          interaction: {
            mode: 'index'
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false,
      }
  });
}

function renderHydrationChart(data, dates) {
  const chartLayout = document.getElementById('myChart');

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Ounces of water consumed',
              data: data,
              backgroundColor: [
                  '#8892B3',
              ],
              borderColor: [
                  '#88B3B3',
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          interaction: {
            mode: 'index'
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false,
      }
  });
};

function renderActivityChart(data, dates) {
  const chartLayout = document.getElementById('myChart');
  const dataSet1 = data[0];
  const dataSet2 = data[1];
  const dataSet3 = data[2]

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Step count',
              data: dataSet1,
              backgroundColor: [
                  '#8892B3',
              ],
              borderColor: [
                  '#88B3B3',
              ],
              borderWidth: 1
          },
          {
              label: 'Flights of stairs climbed',
              data: dataSet2,
              backgroundColor: [
                  '#D6C2FF'
              ],
              borderColor: [
                  '#5F6E7D'
              ],
              borderWidth: 1
          },
          {
              label: 'Minutes active',
              data: dataSet3,
              backgroundColor: [
                  'black'
              ],
              borderColor: [
                  'black'
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          interaction: {
            mode: 'index'
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false,
      }
  });
};

export default {renderHydrationChart, renderSleepChart, renderActivityChart}
