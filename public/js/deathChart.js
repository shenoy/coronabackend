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
        data: [102, 50, 47, 14, 7, 26, 11, 14, 2, 16],
        backgroundColor: 'black'
      },
      {
        label: 'Infections',
        data: [2189, 536, 624, 242, 274, 390, 368, 499, 148, 418],
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
