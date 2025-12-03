import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function UploadIcon({ width = 16, height = 16, color = '#9b9baa' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M7.99683 1.99927V9.99606"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.3288 5.33126L7.99679 1.99927L4.66479 5.33126"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9945 9.99609V12.6617C13.9945 13.0152 13.854 13.3542 13.6041 13.6041C13.3541 13.8541 13.0151 13.9945 12.6617 13.9945H3.33207C2.97859 13.9945 2.63958 13.8541 2.38964 13.6041C2.13969 13.3542 1.99927 13.0152 1.99927 12.6617V9.99609"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

