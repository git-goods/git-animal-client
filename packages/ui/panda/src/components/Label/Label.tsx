import { styled, type HTMLStyledProps } from '_panda/jsx';
import { label } from '_panda/recipes';

export const Label = styled('label', label);
export type LabelProps = HTMLStyledProps<typeof Label>;
