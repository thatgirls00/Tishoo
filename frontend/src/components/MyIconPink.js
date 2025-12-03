import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MyIconPink({ width = 24, height = 24, color = '#FB23CB' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.9966 20.9963V18.9967C18.9966 17.936 18.5752 16.9188 17.8252 16.1687C17.0752 15.4187 16.058 14.9974 14.9973 14.9974H8.99833C7.93764 14.9974 6.92041 15.4187 6.17039 16.1687C5.42038 16.9188 4.99902 17.936 4.99902 18.9967V20.9963"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9978 10.9981C14.2066 10.9981 15.9971 9.20754 15.9971 6.99878C15.9971 4.79003 14.2066 2.99948 11.9978 2.99948C9.78908 2.99948 7.99854 4.79003 7.99854 6.99878C7.99854 9.20754 9.78908 10.9981 11.9978 10.9981Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

