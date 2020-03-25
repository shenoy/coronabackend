const myChart = document.getElementById('myChart');

const deathChart = new Chart(myChart, {
  type: 'horizontalBar',
  data: {
    labels: [
      'London',
      'Southeast',
      'Midlands',
      'Southwest',
      'East Anglia',
      'Northwest',
      'Yorkshire & Northeast',
      'Scotland',
      'N.Ireland',
      'Wales'
    ],
    datasets: [
      {
        label: 'Deaths',
        data: [143,64,62,22,19,48,27,22,4,22],
        backgroundColor: 'black'
      },
      {
        label: 'Infections',
        data: [2872,751,1074,345,429,593,542,584,148,478],
        backgroundColor: 'red'
      }
    ]
  },
  options: {
    title: {
      display: 'true',
      text: 'Coronavirus cases by region in UK',
      fontSize: 20
    }
  }
});
