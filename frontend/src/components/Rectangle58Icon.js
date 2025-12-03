import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export default function Rectangle58Icon({ width = 94, height = 94 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 94 94" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear" x1="10.0478" y1="8.66297" x2="111.395" y2="61.1395" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#1E78FF" stopOpacity="0.647059" />
          <Stop offset="0.447036" stopColor="#1E78FF" stopOpacity="0.955296" />
          <Stop offset="1" stopColor="#1E78FF" stopOpacity="0.9" />
        </LinearGradient>
        <ClipPath id="clip">
          <Path d="M0 13.8081C0 6.18212 6.18211 0 13.8081 0H80.0872C87.7132 0 93.8953 6.18211 93.8953 13.8081V46.9477L70.4215 70.4215L46.9477 93.8953H13.8081C6.18211 93.8953 0 87.7132 0 80.0872V13.8081Z" />
        </ClipPath>
      </Defs>
      <Path
        d="M0 13.8081C0 6.18212 6.18211 0 13.8081 0H80.0872C87.7132 0 93.8953 6.18211 93.8953 13.8081V46.9477L70.4215 70.4215L46.9477 93.8953H13.8081C6.18211 93.8953 0 87.7132 0 80.0872V13.8081Z"
        fill="url(#paint0_linear)"
        fillOpacity="0.3"
      />
    </Svg>
  );
}

