import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MyIcon({ width = 24, height = 24, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.9967 20.9963V18.9966C18.9967 17.9359 18.5753 16.9187 17.8253 16.1687C17.0753 15.4187 16.0581 14.9973 14.9974 14.9973H8.99845C7.93777 14.9973 6.92053 15.4187 6.17051 16.1687C5.4205 16.9187 4.99915 17.9359 4.99915 18.9966V20.9963"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.998 10.9981C14.2067 10.9981 15.9973 9.20757 15.9973 6.99881C15.9973 4.79006 14.2067 2.99951 11.998 2.99951C9.78921 2.99951 7.99866 4.79006 7.99866 6.99881C7.99866 9.20757 9.78921 10.9981 11.998 10.9981Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


