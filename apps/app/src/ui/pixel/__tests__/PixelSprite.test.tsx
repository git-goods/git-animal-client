import { render, screen, waitFor } from '@testing-library/react-native';
import { PixelSprite } from '../PixelSprite';

const mockLoadData = jest.fn();
jest.mock('@shopify/react-native-skia', () => ({
  Canvas: 'Canvas',
  Image: 'SkiaImage',
  FilterMode: { Nearest: 1 },
  MipmapMode: { None: 0 },
  Skia: { Image: { MakeImageFromEncoded: jest.fn() } },
  loadData: (...args: unknown[]) => mockLoadData(...args),
}));

const image = { width: () => 140, height: () => 140 };

describe('PixelSprite', () => {
  beforeEach(() => mockLoadData.mockReset());

  it('디코딩이 null 이면 onError 를 부르고 아무것도 그리지 않는다', async () => {
    mockLoadData.mockImplementation((_s, _f, onError) => {
      onError(new Error('Could not load data'));
      return Promise.resolve(null);
    });
    const onError = jest.fn();
    await render(<PixelSprite source="x" maxWidth={300} maxHeight={300} onError={onError} />);
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
    expect(screen.toJSON()).toBeNull();
  });

  it('네트워크 reject 도 onError 로 모은다', async () => {
    mockLoadData.mockRejectedValue(new Error('network'));
    const onError = jest.fn();
    await render(<PixelSprite source="x" maxWidth={300} maxHeight={300} onError={onError} />);
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });

  it('로드되면 정수배 크기로 그린다', async () => {
    mockLoadData.mockResolvedValue(image);
    await render(<PixelSprite source="x" maxWidth={300} maxHeight={300} />);
    await waitFor(() => expect(screen.toJSON()).not.toBeNull());
    expect(JSON.stringify(screen.toJSON())).toContain('"width":280');
  });
});
