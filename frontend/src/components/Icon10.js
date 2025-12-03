import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Icon10({ width = 24, height = 24, color = '#9C9C9C' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.99916 19.9965H19.9964C20.5267 19.9965 21.0353 19.7858 21.4103 19.4108C21.7853 19.0358 21.996 18.5272 21.996 17.9969V7.99861C21.996 7.46827 21.7853 6.95965 21.4103 6.58464C21.0353 6.20963 20.5267 5.99896 19.9964 5.99896H12.0678C11.7384 5.99725 11.4146 5.91422 11.125 5.75724C10.8355 5.60026 10.5892 5.37419 10.408 5.09911L9.58819 3.89932C9.40704 3.62425 9.16076 3.39818 8.87121 3.2412C8.58167 3.08422 8.25783 3.00119 7.92848 2.99948H3.99916C3.46882 2.99948 2.9602 3.21016 2.5852 3.58517C2.21019 3.96017 1.99951 4.46879 1.99951 4.99913V17.9969C1.99951 19.0967 2.89935 19.9965 3.99916 19.9965Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99854 9.99826V13.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.998 9.99826V11.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9971 9.99826V15.9972"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

