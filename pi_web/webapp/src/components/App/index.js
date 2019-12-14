import * as React from 'react';
import ROSLIB from 'roslib';
import Navigation from '../Navigation';
import CPUTemp from '../CPUTemp';

class App extends React.Component<Props, State>{

  constructor(props){
    super(props);

    this.state = {
      connected: false,
      error: undefined,
      url: "ws://" + window.location.hostname + ":9090",
      CPUTemp: 0.0,
    }

    this.ros = null;
    this.cpuTempSub = null;
  }

  componentDidMount(){

    try{
      this.ros = new ROSLIB.Ros({
        url : this.state.url,
      });


      if (this.ros) this.ros.on('connection', () => {
        this.setState({
          ros: JSON.stringify(this.ros),
          connected: true,
        });

        this.cpuTempSub = new ROSLIB.Topic({
          ros: this.ros,
          name: 'pi/core/cpu_temp',
          messageType: 'std_msgs/Float32'
        })

        this.cpuTempSub.subscribe((message: Message) => {
          this.setState({
            CPUTemp: message.data,
          });
        });
      });

      if(this.ros) this.ros.on('error', (error) => {
        console.log(error);
        this.setState({
          error: (
            <div>Unable to establish connection to rosbridge server</div>
          )
        });
      });
    } catch(e) {
      console.log("Failed to create ros instance", e)
      this.setState({
        error: (
          <div>{e.message}</div>
        ),
      });
    }

    this.setState({
      ros: JSON.stringify(this.ros)
    });

  }

  render(){
    return(
      <div>
        <Navigation data={this.state.connected}/>
        <hr />

        <CPUTemp data={this.state.CPUTemp}/>

      </div>
    );
  }
}


export default App;
