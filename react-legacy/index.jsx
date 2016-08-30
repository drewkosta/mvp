import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.jsx';
import GMap from './map.jsx';

class App extends React.Component {
  
  constructor () {
    super();
    var now = new Date();
    this.state = {
      day: now.getDay(), // dayorder in API
      hour: now.getHours(),
      minute: now.getMinutes()
    };
  }
  
  changeDay () {
    var day = document.getElementById('day');
    day = day.options[day.selectedIndex].value;
    this.setState({
      day: day
    });
  }
  
  changeHour () {
    var hour = document.getElementById('hour');
    hour = hour.options[hour.selectedIndex].value;
    this.setState({
      hour: hour
    });
  }
  
  changeMinute () {
    var minute = document.getElementById('minute');
    minute = minute.options[minute.selectedIndex].value;
    this.setState({
      minute: minute
    });
  }
  
  render () {
    return (
      <div>
        <Menu changeDay={this.changeDay.bind(this)} changeHour={this.changeHour.bind(this)} changeMinute={this.changeMinute.bind(this)} />
        <GMap day={this.state.day} hour={this.state.hour} minute={this.state.minute} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));