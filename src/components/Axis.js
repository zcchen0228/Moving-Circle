import React from 'react';
import Circle from './circle'
import _ from 'lodash'

/**
 * TODO:
 * coordinates 1: 100/100, coordinates 2: 400,300 
 * Assignment 1: move circle from coo1 to coord2 in a steight line
 * Assignment 2: use these 4 points to move circle from p1 to p2 to p3 to p4 in a smooth curve
 *              you can use any curve you want (in exactly 5 seconds)
 */

class Axis extends React.Component {
  constructor(props) {
    super(props);
    
    
    /**
     * HINT! USE LODASH
     * https://lodash.com/docs/4.17.4
     * 
     * [
     *    {agent : 0, time: 10, x: 10, y: 20},
     *    {agent : 1, time: 0,  x: 0,  y: 00},
     *    {agent : 0, time: 0,  x: 10, y: 10},
     *    {agent : 1, time: 10, x: 10, y: 20}
     * ]
     * 
     * Step 1: group by agent
     * {
     *    0 => [ {time:0, x: 10, y:10}  , {time:10, x: 10, y:20} ],
     *    1 => [ {time:10, x: 10, y:20} ,    {time:0, x: 0, y:0} ]
     * }
     * 
     * Step 2: order keymarks for every agent by time ascending
     * {
     *    0 => [ {time:0, x: 10, y:10}  , {time:10, x: 10, y:20} ],
     *    1 => [ {time:0, x: 0, y:0}    , {time:10, x: 10, y:20} ]
     * }
     * 
     * ///////////////////// IN CONSTRUCTOR \\\\\\\\\\\\\\\\\\\\\
     * ==========================================================
     * \\\\\\\\\\\\\\\\\\\\\   IN RENDER    /////////////////////
     * 
     * Step 3: find either pair of keymarkers or find keymarker 
     * {
     *    0 => [ {time:0, x: 10, y:10}  , {time:10, x: 10, y:20} ],
     *    1 => [ {time:0, x: 0, y:0} ]
     * }
     * 
     * Step 4:
     * if 2 markers ==> use formula to get current positon
     * if 1 marker  ==> use that markers position
     **/
     
    this.mainLoop = this.mainLoop.bind(this) 

    let agents = this.props.agents
    
    agents = this.groupKeymarkers(agents)
    
    this.state = {
      agents: agents,
      time: 0
    }
  }

  groupKeymarkers(agents){
    agents = _.groupBy(agents, 'agent')
    agents = _.map(agents, function(a) {
      a = _.map(a, function(m) { return _.omit(m, 'agent')})
      a = _.sortBy(a, "time")
      return a
    })
    
    return agents
  }
  
  drawCircles(time){ 

    return this.state.agents.map(function(aMarkers, a){
      var x, y
      
      if(aMarkers.length === 0) return null

      // check if agent has only one marker or if
      // time is lower than first markers's time, if so, display that one
      else if(aMarkers.length === 1 || time <= aMarkers[0].time){
        x = aMarkers[0].x
        y = aMarkers[0].y
      }
      
      // check if time is larger than last marker's time
      else if (time >= aMarkers[aMarkers.length-1].time){
        x = aMarkers[aMarkers.length-1].x
        y = aMarkers[aMarkers.length-1].y        
      }
      
      // in other cases (somewhere in between) we have to find the two 
      // correct markers and calculate relative position between them
      else {

        var distance_old = 100000000000, k=0
        
        // technique: loop through once and calculate the minimum distance to both points
        for (var i=0; i < aMarkers.length-1; i++){
          var distance_new = Math.abs(aMarkers[i].time - time) + Math.abs(aMarkers[i+1].time - time)
          // every time we find a pair that is close we update k
          if(distance_new < distance_old){
            distance_old = distance_new
            k = i
          }
        }

        // calculate position between marker [k] and marker [k+1]
        var rel_time = (time - aMarkers[k].time) / (aMarkers[k+1].time - aMarkers[k].time)
        x = aMarkers[k].x +  (aMarkers[k+1].x - aMarkers[k].x) * rel_time
        y = aMarkers[k].y +  (aMarkers[k+1].y - aMarkers[k].y) * rel_time
      }
      
      return <Circle key={a} posX = {x} posY = {y} />
    })
  }

  componentDidMount(){
    this.then = Date.now();
    this.mainLoop();
  }
  
  mainLoop(){
    var time = Date.now() - this.then
    this.setState({ time: time })
    if(time < 5000) requestAnimationFrame(this.mainLoop)
  }

  render(){
    return (
      <div className="bg">
        {this.drawCircles(this.state.time)}
      </div>
    )
  } 
}

export default Axis;