import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Menu />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));