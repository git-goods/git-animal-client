import { FC, ComponentProps } from 'react';
import Svg from '../Svg';

export const RadioButtonOn: FC<ComponentProps<typeof Svg>> = ({ color = '#00894D', ...rest }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M12 16.998C14.7614 16.998 17 14.7595 17 11.998C17 9.23662 14.7614 6.99805 12 6.99805C9.23858 6.99805 7 9.23662 7 11.998C7 14.7595 9.23858 16.998 12 16.998Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z"
        fill={color}
      />
    </Svg>
  );
};

export const RadioButtonOff: FC<ComponentProps<typeof Svg>> = ({ color = '#D8D9DD', ...rest }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85788 16.1421 4.50003 12 4.50003C7.85788 4.50003 4.50003 7.85788 4.50003 12C4.50003 16.1421 7.85788 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        fill={color}
      />
    </Svg>
  );
};
