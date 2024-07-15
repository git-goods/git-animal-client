import { HTMLStyledProps, styled } from '_panda/jsx';
import { badge } from '_panda/recipes';

export const Badge = styled('div', badge);

export type BadgeProps = HTMLStyledProps<typeof Badge>;
