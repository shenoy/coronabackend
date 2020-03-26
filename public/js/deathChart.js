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
        data: [155,63,67,23,29,53,24,25,10,28],
        backgroundColor: 'red'
      },
      {
        label: 'Infections',
        data: [3247,876,1296,397,480,703,698,894,241,741],
        backgroundColor: 'pink'
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
