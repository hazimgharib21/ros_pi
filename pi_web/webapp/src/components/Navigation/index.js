import * as React from 'react';

class Navigation extends React.Component<Props, State>{

  render(){

    if (this.props.data){
      return(
        <div>Connected</div>
      );
    }else{
      return(
        <div>Disconnected</div>
      );
    }
  }
}


export default Navigation;
