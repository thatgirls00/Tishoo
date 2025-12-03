import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function MentorIcon({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Defs>
        <ClipPath id="clip0_1_9591">
          <Rect width="19.9893" height="19.9893" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_9591)">
        <Path
          d="M18.3235 14.1594C18.3235 14.6012 18.148 15.0249 17.8356 15.3373C17.5232 15.6497 17.0995 15.8252 16.6577 15.8252H5.68694C5.24519 15.8253 4.82156 16.0008 4.50924 16.3133L2.67523 18.1473C2.59253 18.23 2.48717 18.2863 2.37247 18.3091C2.25777 18.3319 2.13888 18.3202 2.03083 18.2754C1.92279 18.2307 1.83044 18.1549 1.76546 18.0577C1.70048 17.9604 1.66579 17.8461 1.66577 17.7292V4.16479C1.66577 3.723 1.84127 3.29931 2.15366 2.98692C2.46606 2.67452 2.88975 2.49902 3.33154 2.49902H16.6577C17.0995 2.49902 17.5232 2.67452 17.8356 2.98692C18.148 3.29931 18.3235 3.723 18.3235 4.16479V14.1594Z"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

