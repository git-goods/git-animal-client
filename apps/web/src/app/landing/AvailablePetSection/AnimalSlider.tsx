import AnimalCardList from './AnimalCardList';
import AnimalSliderContainer from './AnimalSliderContainer';

function AnimalSlider() {
  return (
    <AnimalSliderContainer>
      <div>
        <AnimalCardList />
      </div>
      <div>
        <AnimalCardList />
      </div>
    </AnimalSliderContainer>
  );
}

export default AnimalSlider;
