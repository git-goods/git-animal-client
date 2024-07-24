import { cva } from '_panda/css';
import { styled } from '_panda/jsx';

const mainHeadingRecipe = cva({
  base: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '100%',
    textStyle: 'glyph24.bold',
  },
});

const MainHeading = styled('h1', mainHeadingRecipe);

export default MainHeading;
