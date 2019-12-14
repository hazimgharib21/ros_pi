import * as React from 'react';
import ROSLIB from 'roslib';
import Chart from "chart.js";

class Home extends React.Component<Props, State>{

  constructor(){
    super();

  }

  chartRef = React.createRef();
  subscriber = new ROSLIB.Topic({
    ros:  this.props.state.ros,
    name: 'pi/core/cpu_temp',
    messageType: 'std_msgs/Float32',
  })

  
  componentDidMount()
  {
    console.log(this.props.ros);
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, 
    {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91],
          }
        ]
      },
      options: {}
    });
  }

  render(){
    return(
      <div>
        item from parent {this.props.data}
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    );
  }

}

export default Home;
