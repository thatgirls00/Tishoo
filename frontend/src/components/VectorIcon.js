import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function VectorIcon({ width = 181, height = 86 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 181 86" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1_8674" x1="179.877" y1="85.1831" x2="0.530758" y2="85.1831" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#1E78FF" />
          <Stop offset="1" stopColor="#BED8FF" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M0.408829 65.6732L179.714 0.40918V19.9191L0.408829 85.1831V65.6732Z" 
        fill="url(#paint0_linear_1_8674)" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

