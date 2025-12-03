import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowLeftIcon2({ width = 24, height = 24, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M14.9975 17.9969L8.99854 11.998L14.9975 5.99902" 
        stroke={color} 
        strokeWidth="1.99965" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

