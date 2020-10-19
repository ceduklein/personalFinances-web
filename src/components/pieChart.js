import React from 'react';
import Chart from 'react-google-charts';

class PieChart extends React.Component{


  render() {

    return(
      <Chart 
        width={'350'}
        height={'350'}
        chartType="PieChart"
        data={this.props.data}
        title={this.props.title}
        options={{
          pieHole: 0.4,
          legend:{
            textStyle: {color: 'black', fontSize: 16},
            alignment: "center"
          },
          slices: [
            {
              color: "#2BB673"
            },
            {
              color: "#007fad"
            },
            {
              color: "#d91e48"
            }
          ],
          tooltip: {
            showColorCode: true
          },
          // is3D: true,
          chartArea: {
            left: 0,
            top: 10,
            bottom: 10,
            width: "100%",
            height: "100%",
            backgroundColor: { stroke: '#323232', strokeWidth: 1 }
          },
        }}
      />
    )
  }
}
export default PieChart;