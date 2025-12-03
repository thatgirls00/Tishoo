import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export default function Ellipse1Icon({ width = 135, height = 135 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 135 135" fill="none">
      <Circle cx="67.25" cy="67.25" r="67.25" fill="#FB23CB" />
    </Svg>
  );
}

