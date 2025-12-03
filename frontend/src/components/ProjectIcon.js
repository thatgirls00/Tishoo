import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ProjectIcon({ width = 24, height = 24, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.99928 19.9965H19.9965C20.5268 19.9965 21.0354 19.7859 21.4105 19.4109C21.7855 19.0359 21.9961 18.5272 21.9961 17.9969V7.99864C21.9961 7.4683 21.7855 6.95968 21.4105 6.58467C21.0354 6.20966 20.5268 5.99899 19.9965 5.99899H12.0679C11.7385 5.99728 11.4147 5.91425 11.1251 5.75727C10.8356 5.60029 10.5893 5.37422 10.4082 5.09915L9.58831 3.89935C9.40716 3.62428 9.16088 3.39821 8.87134 3.24123C8.58179 3.08425 8.25795 3.00122 7.9286 2.99951H3.99928C3.46894 2.99951 2.96033 3.21019 2.58532 3.5852C2.21031 3.9602 1.99963 4.46882 1.99963 4.99916V17.9969C1.99963 19.0967 2.89948 19.9965 3.99928 19.9965Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99866 9.99829V13.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9979 9.99829V11.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9972 9.99829V15.9972"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


