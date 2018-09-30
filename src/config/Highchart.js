
export default function () {
  return {

    title: {
      text: ''
    },

    subtitle: {
      text: ''
    },

    chart: {
      height: '400px'
    },

    yAxis: {
      title: {
        text: 'Price'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [{
      name: 'Installation',
      data: [1, 2, 3, 4, 5, 6, 7, 8]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }
}