import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ProgressRingIcon4({ width = 160, height = 160, progress = 50, color = '#1E78FF' }) {
  const progressPercent = Math.min(Math.max(progress, 0), 100);
  
  // For 50% progress, we show half the circle
  // The path starts from top (12 o'clock) and goes clockwise
  // For 50%, we need to draw from 12 o'clock to 6 o'clock (180 degrees)
  
  return (
    <Svg width={width} height={height} viewBox="0 0 160 160" fill="none">
      {/* Background circle */}
      <Path
        d="M80 150C118.66 150 150 118.66 150 80C150 41.3401 118.66 10 80 10C41.3401 10 10 41.3401 10 80C10 118.66 41.3401 150 80 150Z"
        stroke="#E5E5E5"
        strokeWidth="12"
      />
      {/* Progress circle - for 50% it goes from top to bottom */}
      {progressPercent > 0 && (
        <Path
          d="M80 150C118.66 150 150 118.66 150 80C150 41.3401 118.66 10 80 10"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

