import React from 'react';
import Svg, { Circle, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function ProgressRingIcon3({ width = 64, height = 64, progress = 0, color = '#ffb4c8' }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 64 64">
      <G clipPath="url(#clip0)">
        <Circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#E2E2E8"
          strokeWidth="1.99988"
          fill="none"
        />
        {progress > 0 && (
          <Circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="1.99988"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
        )}
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="63.996" height="63.996" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

