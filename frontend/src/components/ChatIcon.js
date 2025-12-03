import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ChatIcon({ width = 13.492, height = 13.492, color = '#999999' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Path 
        d="M7.54883 2.25098L6.96656 4.42404" 
        stroke={color} 
        strokeWidth="1.09742" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M11.8948 3.41602L11.3126 5.58908" 
        stroke={color} 
        strokeWidth="1.09742" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M13.2336 4.93846L5.62785 2.90051C5.02778 2.73972 4.41098 3.09583 4.25019 3.69591L2.21224 11.3016C2.05145 11.9017 2.40756 12.5185 3.00764 12.6793L10.6134 14.7172C11.2134 14.878 11.8302 14.5219 11.991 13.9218L14.029 6.31612C14.1898 5.71605 13.8336 5.09925 13.2336 4.93846Z" 
        stroke={color} 
        strokeWidth="1.09742" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M3.66791 5.86914L13.4467 8.48936" 
        stroke={color} 
        strokeWidth="1.09742" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

