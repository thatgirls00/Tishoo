import React from 'react';
import Svg, { Circle, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function ProgressRingIcon2({ width = 32, height = 32, progress = 0, color = '#1e78ff', variant = 'empty' }) {
  // variant: 'empty', 'partial', 'full', 'dashed'
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32">
      <G clipPath="url(#clip0)">
        {variant === 'empty' && (
          <Circle
            cx="16"
            cy="16"
            r="15"
            stroke="#E2E2E8"
            strokeWidth="1.99988"
            fill="none"
          />
        )}
        {variant === 'partial' && (
          <>
            <Circle
              cx="16"
              cy="16"
              r="15"
              stroke="#E2E2E8"
              strokeWidth="1.99988"
              fill="none"
            />
            <Circle
              cx="16"
              cy="16"
              r="15"
              stroke={color}
              strokeWidth="1.99988"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 15 * (progress / 100)} ${2 * Math.PI * 15}`}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </>
        )}
        {variant === 'full' && (
          <Circle
            cx="16"
            cy="16"
            r="15"
            stroke={color}
            strokeWidth="1.99988"
            fill="none"
          />
        )}
        {variant === 'dashed' && (
          <>
            <Circle
              cx="16"
              cy="16"
              r="15"
              stroke="#F5F9FF"
              strokeWidth="1.99988"
              fill="none"
            />
            <Circle
              cx="16"
              cy="16"
              r="15"
              stroke={color}
              strokeWidth="1.99988"
              fill="none"
              strokeDasharray="94.24 94.24"
              strokeLinecap="round"
            />
          </>
        )}
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="31.998" height="31.998" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

