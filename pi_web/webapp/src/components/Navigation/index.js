import * as React from 'react';
import '../../css/bootstrap.min.css';
import { Nav } from 'react-bootstrap'; 

class Navigation extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      status: this.props.data ? "Connected":"Disconnected",
      style: this.props.data ? "Green":"Red",
    };
  }

  componentDidMount(){
  }

  componentDidUpdate(nextProps){
    if(this.props !== nextProps){
      console.log("state change " + nextProps.data)
      this.setState({
        status: nextProps.data ? "Connected":"Disconnected",
        style: nextProps.data ? "Green":"Red",
      });
    }
  }

  render(){

    const style = {
      color: this.state.style
    }

    if (this.props.data){
      return(
        <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <Nav.Item className="navbar-brand col-sm-3 col-md-2 mr-0">
            Raspberry Pi 4 (ROS)
          </Nav.Item>
          <Nav.Item className="navbar-brand px-3">
            <span style={style}>Connected</span>
          </Nav.Item>
        </Nav>
      );
    }else{
      return(
        <Nav>
          <Nav.Item>
            Disconnected
          </Nav.Item>
        </Nav>
      );
    }
  }
}


export default Navigation;
