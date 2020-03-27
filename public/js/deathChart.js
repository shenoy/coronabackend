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
        label: 'Infections',
        data: [3919, 1129, 1636, 453, 592, 837, 891, 1059, 275, 921],
        backgroundColor: 'pink'
      },
      {
        label: 'Deaths',
        data: [155, 63, 67, 23, 29, 53, 24, 33, 13, 34],
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
