import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SendIcon({ width = 19.989, height = 19.989, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path 
        d="M16.039 21.2648L11.7971 13.9176L19.1443 9.67569" 
        stroke={color} 
        strokeWidth="1.99965" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

