import React from 'react';
import ReactDOM from 'react-dom';

class GMap extends React.Component {
  constructor () {
  super();
  }
  
  componentWillMount () {
    this.getTrucks();
  }
  
  componentWillUpdate () {
    this.getTrucks();
  }
  
  getTrucks () {
    $.ajax('/api/trucks', {
      type: 'GET',
      data: {
        day: this.props.day,
        hour: this.props.hour,
        minute: this.props.minute
      },
      success: (data) => {
        console.log(data);
        // do stuff
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  render () {
    return (
      <div>
        {this.props.day}
      </div>  
    );
  }
  
};
export default GMap;