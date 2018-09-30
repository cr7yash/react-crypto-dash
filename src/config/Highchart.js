
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

    xAxis: {
      type: 'datetime'
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

    series: this.state.historical,

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