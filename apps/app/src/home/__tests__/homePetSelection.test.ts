import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadHomePets, saveHomePets } from '../homePetSelection';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('homePetSelection', () => {
  beforeEach(() => AsyncStorage.clear());

  it('저장한 적 없으면 null', async () => {
    await expect(loadHomePets('a')).resolves.toBeNull();
  });

  it('계정별로 저장하고 읽는다', async () => {
    await saveHomePets('a', ['1', '2']);
    await expect(loadHomePets('a')).resolves.toEqual(['1', '2']);
    await expect(loadHomePets('b')).resolves.toBeNull();
  });

  it('깨진 값이면 null', async () => {
    await AsyncStorage.setItem('gitanimals.homePets.a', '{oops');
    await expect(loadHomePets('a')).resolves.toBeNull();
  });
});
