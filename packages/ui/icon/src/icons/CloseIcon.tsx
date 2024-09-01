import { type ComponentProps, type FC } from 'react';

import Svg from '../Svg';

export const CloseIcon: FC<ComponentProps<typeof Svg>> = ({ color, ...rest }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={24} viewBox="0 -960 960 960" width={24} fill={color} {...rest}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </Svg>
  );
};
