import * as React from 'react';
import Chart from "chart.js";

class CPUTemp extends React.Component<Props, State>{

  constructor(props){
    super(props);

    this.chartRef = React.createRef();
    this.lineChart = null;
  }

  
  componentDidMount()
  {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.lineChart = new Chart(myChartRef, 
    {
      type: "line",
      data: {
        labels: ["", "", "", "","", "", "", "", "",""],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }
        ]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: "CPU Temperature",
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 90,
              steps: 10,
              stepValue: 5,
            }
          }]
        }
      }
    });

  }
  
  componentDidUpdate(nextProps){
    this.lineChart.data.datasets[0].data.push(nextProps.data);
    this.lineChart.data.datasets[0].data.shift();
    this.lineChart.update();
  }

  render(){
    return(
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    );
  }

}

export default CPUTemp;
