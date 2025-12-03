import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export default function ProgressRingIcon({ width = 32, height = 32, progress = 0, color = '#1e78ff' }) {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32">
      {/* Background circle */}
      <Circle
        cx="16"
        cy="16"
        r={radius}
        stroke="#e2e2e8"
        strokeWidth="2"
        fill="none"
      />
      {/* Progress circle */}
      <Circle
        cx="16"
        cy="16"
        r={radius}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
      />
    </Svg>
  );
}

