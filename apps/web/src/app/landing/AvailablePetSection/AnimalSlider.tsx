import { css } from '_panda/css';

import AnimalCardList from './AnimalCardList';
import AnimalSliderContainer from './AnimalSliderContainer';

function AnimalSlider() {
  return (
    <div className={container}>
      <AnimalSliderContainer>
        <div>
          <AnimalCardList />
        </div>
        <div>
          <AnimalCardList />
        </div>
      </AnimalSliderContainer>
    </div>
  );
}

export default AnimalSlider;

const container = css({
  width: '1120px',
  height: '1024px',

  _mobile: {
    width: 'calc(100vw - 40px)',
  },
});
