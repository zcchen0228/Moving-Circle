import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Axis from './components/Axis';
import Record from './components/Record';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';

// Create a new component which generate HTML and put it in the DOM

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x: 0, 
      y: 0
    };
  }
  
  render () {
    return (
      <div>
        <Axis 
          agents = {[
            {time: 0,    agent: 1, x:0,   y:100},
            {time: 1000, agent: 1, x:100, y:0},
            {time: 1500, agent: 2, x:100, y:100},
            {time: 3000, agent: 1, x:0,   y:100},
            {time: 3000, agent: 2, x:0,   y:0},
            {time: 2000, agent: 1, x:90,  y:100},
            {time: 0,    agent: 2, x:10,   y:0},
            {time: 0,    agent: 3, x:120, y:200}
          ]}
        />
      </div>
   );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));

