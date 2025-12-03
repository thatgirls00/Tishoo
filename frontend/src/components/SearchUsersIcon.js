import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SearchUsersIcon({ width = 16, height = 16, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.9967 20.9964V18.9967C18.9967 17.9361 18.5753 16.9188 17.8253 16.1688C17.0753 15.4188 16.0581 14.9974 14.9974 14.9974H8.99843C7.93775 14.9974 6.92051 15.4188 6.1705 16.1688C5.42048 16.9188 4.99913 17.9361 4.99913 18.9967V20.9964"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9979 10.9981C14.2067 10.9981 15.9972 9.20757 15.9972 6.99881C15.9972 4.79006 14.2067 2.99951 11.9979 2.99951C9.78914 2.99951 7.9986 4.79006 7.9986 6.99881C7.9986 9.20757 9.78914 10.9981 11.9979 10.9981Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

