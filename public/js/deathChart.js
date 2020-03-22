import Chart from 'chart.js';

const ctx = document.getElementById('deathChart').getContext('2d');

export const deathChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: [
      'Total',
      'East Anglia',
      'Northwest',
      'Southeast',
      'London',
      'Scotland',
      'N.Ireland',
      'Wales',
      'Southwest',
      'Midlands'
    ],
    datasets: [
      {
        label: 'Deaths',
        data: [233, 5, 12, 28, 51, 6, 1, 3, 11, 36],
        backgroundColor: 'black'
      },
      {
        label: 'Infections',
        data: [5018, 147, 220, 340, 1221, 322, 86, 191, 140, 282],
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
