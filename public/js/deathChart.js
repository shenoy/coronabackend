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
        data: [116, 57, 53, 17, 7, 34, 19, 16, 4, 17],
        backgroundColor: 'black'
      },
      {
        label: 'Infections',
        data: [2433, 590, 808, 278, 351, 496, 446, 584, 148, 478],
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
