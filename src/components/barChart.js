import React from 'react'
import { Chart } from 'react-google-charts';

class BarChart extends React.Component {

  render() {
    return(
      <Chart
        chartType= "ComboChart"
        data={this.props.data}
        options={{
          colors: ['#2BB673', '#d91e48','#007fad'],
          legend: { position: 'bottom', textStyle: { fontSize: 14 } },
          seriesType: 'bars',
          chartArea: { bottom: 50 },
          bar: {groupWidth: '35%'},
          vAxis: { gridlines: { count: 4 } },
        }}
      />
    )
  }
}
export default BarChart;