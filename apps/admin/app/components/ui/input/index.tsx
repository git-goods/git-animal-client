import { styled } from '_panda/jsx';
import { input } from '_panda/recipes';
import { HTMLStyledProps } from '_panda/types';

export const Input = styled('input', input);
export type InputProps = HTMLStyledProps<typeof Input>;
