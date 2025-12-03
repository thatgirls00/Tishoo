import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Group2Icon({ width = 145, height = 116 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 145 116" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1_8661" x1="72.0788" y1="0.40918" x2="72.0788" y2="115.133" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A9CBFF" />
          <Stop offset="1" stopColor="#1E78FF" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M0.408829 115.133L143.749 62.9575V0.40918L0.408829 52.5849V115.133Z" 
        fill="url(#paint0_linear_1_8661)" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M51.467 45.3232L10.8419 60.1107V100.736L51.467 85.9484V45.3232Z" 
        fill="#BEDBFF" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M51.467 85.95L10.8419 60.1123" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M51.467 45.3232L10.8419 100.736" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M60.9337 60.6526C60.9337 63.9833 64.2436 66.2976 67.371 65.1613L130.164 42.3051C132.062 41.6171 133.323 39.8136 133.323 37.7964C133.323 34.4657 130.013 32.1514 126.886 33.2877L64.0924 56.1439C62.1951 56.8319 60.9337 58.6354 60.9337 60.6526Z" 
        fill="#BEDBFF" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

