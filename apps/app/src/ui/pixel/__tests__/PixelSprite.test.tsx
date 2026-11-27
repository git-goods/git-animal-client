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
    mockLoadData.mockResolvedValue(null);
    const onError = jest.fn();
    await render(<PixelSprite source="x1" maxWidth={300} maxHeight={300} onError={onError} />);
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
    expect(screen.toJSON()).toBeNull();
  });

  it('네트워크 reject 도 onError 로 모은다', async () => {
    mockLoadData.mockRejectedValue(new Error('network'));
    const onError = jest.fn();
    await render(<PixelSprite source="x2" maxWidth={300} maxHeight={300} onError={onError} />);
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });

  it('로드되면 정수배 크기로 그린다', async () => {
    mockLoadData.mockResolvedValue(image);
    await render(<PixelSprite source="x3" maxWidth={300} maxHeight={300} />);
    await waitFor(() => expect(screen.toJSON()).not.toBeNull());
    expect(JSON.stringify(screen.toJSON())).toContain('"width":280');
  });

  it('Nearest 필터와 mipmap 없음으로 샘플링한다', async () => {
    mockLoadData.mockResolvedValue(image);
    await render(<PixelSprite source="x4" maxWidth={300} maxHeight={300} />);
    await waitFor(() => expect(screen.toJSON()).not.toBeNull());
    expect(JSON.stringify(screen.toJSON())).toContain('"sampling":{"filter":1,"mipmap":0}');
  });
});
