import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Vector2Icon({ width = 72, height = 175 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 72 175" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1_8672" x1="35.6913" y1="0.40918" x2="35.6913" y2="174.601" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A5BFFF" />
          <Stop offset="1" stopColor="white" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M70.9738 48.6809L35.6913 0.40918L0.408844 74.3622L22.6604 66.2622V174.601L48.7222 165.115V56.7757L70.9738 48.6809Z" 
        fill="url(#paint0_linear_1_8672)" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

