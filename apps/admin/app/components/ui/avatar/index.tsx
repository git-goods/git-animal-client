import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '_panda/jsx';
import { avatar } from '_panda/recipes';

const { withProvider, withContext } = createStyleContext(avatar);

export const Avatar = withProvider(styled(AvatarPrimitive.Root), 'root');
export const AvatarImage = withContext(styled(AvatarPrimitive.Image), 'image');
export const AvatarFallback = withContext(styled(AvatarPrimitive.Fallback), 'fallback');
