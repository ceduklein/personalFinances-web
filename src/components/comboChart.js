import React from 'react';
import { Chart } from 'react-google-charts';

class ComboChart extends React.Component {

  render() {
    return(
      <Chart 
        chartType="ComboChart"
        data={this.props.data}
        options={{
          height: 280,
          chartArea: { bottom: 100 },
          legend: { position: 'bottom', textStyle: { fontSize: 15 } },
          seriesType: 'bars',
          colors: ['#2BB673', '#d91e48','#007fad']
        }}
      />
    )
  }
}
export default ComboChart;