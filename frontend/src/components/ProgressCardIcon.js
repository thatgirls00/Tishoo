import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function ProgressCardIcon({ width = 453, height = 387 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 390 388" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1_8647" x1="167.5" y1="38.3029" x2="167.5" y2="386.373" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FB23CB" stopOpacity="0.6" />
          <Stop offset="1" stopColor="#1E78FF" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M68.5978 168.116L4.52029 254.544L-59 277.684V386.373L394 387.8V0.799805L328.251 95.7544L274.972 182.734L201.747 174.75L133.232 118.895L68.5978 168.116Z" 
        fill="url(#paint0_linear_1_8647)" 
        stroke="#FB23CB" 
        strokeOpacity="0.7" 
        strokeWidth="0.5" 
        strokeDasharray="2 2"
      />
    </Svg>
  );
}

