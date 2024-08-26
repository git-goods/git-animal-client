import React, { ComponentProps, FC } from 'react';
import Svg from '../Svg';

export const XIcon: FC<ComponentProps<typeof Svg>> = ({ color = 'white', fillOpacity = 0.5, ...rest }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.68076 2.62009C3.38788 2.32718 2.91301 2.32716 2.6201 2.62004C2.3272 2.91291 2.32717 3.38779 2.62005 3.6807L8.93938 10.0006L2.62004 16.3206C2.32716 16.6135 2.32718 17.0884 2.62009 17.3812C2.91299 17.6741 3.38787 17.6741 3.68075 17.3812L9.99999 11.0613L16.3192 17.3812C16.6121 17.6741 17.087 17.6741 17.3799 17.3812C17.6728 17.0884 17.6728 16.6135 17.3799 16.3206L11.0606 10.0006L17.3799 3.6807C17.6728 3.38779 17.6728 2.91291 17.3799 2.62004C17.087 2.32716 16.6121 2.32718 16.3192 2.62009L9.99999 8.93992L3.68076 2.62009Z"
        fill={color}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default XIcon;
