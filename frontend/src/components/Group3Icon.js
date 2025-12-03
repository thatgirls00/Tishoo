import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Group3Icon({ width = 145, height = 116 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 145 116" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1_8655" x1="72.0788" y1="0.40918" x2="72.0788" y2="115.133" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FB23CB" />
          <Stop offset="1" stopColor="#E96AE9" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M0.408833 115.133L143.749 62.9575V0.40918L0.408833 52.5849V115.133Z" 
        fill="url(#paint0_linear_1_8655)" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M51.467 45.3232L10.8419 60.1107V100.736L51.467 85.9484V45.3232Z" 
        fill="#FFC7F3" 
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
        d="M60.9337 60.6536C60.9337 63.9843 64.2436 66.2986 67.371 65.1623L130.164 42.3061C132.062 41.618 133.323 39.8145 133.323 37.7974C133.323 34.4667 130.013 32.1524 126.886 33.2887L64.0924 56.1449C62.1951 56.8329 60.9337 58.6364 60.9337 60.6536Z" 
        fill="#FFC7F3" 
        stroke="#240C64" 
        strokeWidth="0.817665" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

