import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function UsersIcon2({ width = 24, height = 24, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.9967 20.9964V18.9967C18.9967 17.9361 18.5753 16.9188 17.8253 16.1688C17.0753 15.4188 16.0581 14.9974 14.9974 14.9974H8.99845C7.93777 14.9974 6.92053 15.4188 6.17051 16.1688C5.4205 16.9188 4.99915 17.9361 4.99915 18.9967V20.9964"
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


