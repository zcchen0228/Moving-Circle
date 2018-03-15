import React from 'react';

export default (props) => {
  return (
    <div 
      className='circle'
      style={{
        top : props.posY,
        left: props.posX
      }}
    ></div>
  );
}