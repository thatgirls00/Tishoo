import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function CreateProjectIcon3({ width = 20, height = 20, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Defs>
        <ClipPath id="clip0_1_10611">
          <Rect width="19.9893" height="19.9893" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_10611)">
        <Path
          d="M12.4933 1.66577H4.99731C4.55552 1.66577 4.13183 1.84127 3.81944 2.15366C3.50704 2.46606 3.33154 2.88975 3.33154 3.33154V16.6577C3.33154 17.0995 3.50704 17.5232 3.81944 17.8356C4.13183 18.148 4.55552 18.3235 4.99731 18.3235H14.9919C15.4337 18.3235 15.8574 18.148 16.1698 17.8356C16.4822 17.5232 16.6577 17.0995 16.6577 16.6577V5.8302L12.4933 1.66577Z"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.6604 1.66577V4.99731C11.6604 5.4391 11.8359 5.8628 12.1483 6.17519C12.4607 6.48758 12.8844 6.66308 13.3262 6.66308H16.6577"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.32886 7.49585H6.66309"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.3262 10.8274H6.66309"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.3262 14.1589H6.66309"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

