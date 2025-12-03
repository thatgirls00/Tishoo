import React from 'react';
import Svg, { Path, Defs, ClipPath } from 'react-native-svg';

export default function UnionIcon({ width = 85, height = 122 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 85 122" fill="none">
      <Defs>
        <ClipPath id="bgblur_0_1_1600_clip_path" transform="translate(20 50.5576)">
          <Path d="M57.624 74.4453H84.8916L42.4463 122L0 74.4453H27.2676V-30.5576H57.624V74.4453Z" />
        </ClipPath>
      </Defs>
      <Path
        d="M57.624 74.4453H84.8916L42.4463 122L0 74.4453H27.2676V-30.5576H57.624V74.4453Z"
        fill="white"
        fillOpacity="0.8"
      />
    </Svg>
  );
}


