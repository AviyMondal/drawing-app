import React, { Component } from 'react';
import {
  PolyLine,
  Circle
} from 'draw-shape-reactjs';

export default class Shape extends Component {
  state={
    positions:[],
    error:10,
    continue:true
  }
  render(){
    return (
      <>  
        {this.getEndPositionHint()}
        <div className='App' onMouseDown={ this.handleEvent } onMouseUp={ this.handleEvent }>
          <PolyLine
            position='relative'
            points={this.state.positions}
            color='#ff8f00'
          />
        </div>
        <h4>
          Area={this.calculateArea()}
        </h4>
      </>
    );
  }
  getEndPositionHint(){
    if(this.state.positions.length>0){
      return (
        <Circle center={this.state.positions[0]} radius={10} color='#00701a' />
      );
    }
  }
  calculateArea=()=>{
    if(this.state.continue==true){
      return(
       "Area is not closed"
      );
    }else{
      let arr=this.state.positions;
      let area=0.0;
      let length=arr.length;
      for(let i=0;i<length-1;i+=1){
        area+=arr[i][0]*arr[i+1][1]
        area-=arr[i+1][0]*arr[i][1]
      }
      area+=arr[length-1][0]*arr[0][1]
      area-=arr[length-1][1]*arr[0][0]
      area/=2.0;
      return(
        Math.abs(area)
      );
    }
  }
  handleEvent = (event) => {
    if(this.state.continue==true){
      if (event.type === "mousedown") {
        let array=this.state.positions;
        if(array.length<1){
          array.push([event.pageX,event.pageY])
        }else if(this.nearby(event.pageX, array[0][0]) && this.nearby(event.pageY, array[0][1])){
          array.push(array[0])
          this.setState({
            continue:false
          })
        }else{
          array.push([event.pageX,event.pageY])
        }
        this.setState({
          positions:array
        })
      }
    }
  }
  nearby=(a,b)=>{
    let upperLimit=a+this.state.error;
    let lowerLimit=a-this.state.error;
    if(upperLimit>b && lowerLimit<b){
      return true
    }
    return false
  }
} 