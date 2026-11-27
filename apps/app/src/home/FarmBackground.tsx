import { Image } from 'react-native';

// 피그마 place-su 의 background-home (3배 export). 세로에 맞춰 늘리고 좌우를 자른다
export const FARM_IMAGE = require('../../assets/home/farm.png');
// 이미지 높이 대비 잔디밭 범위 (발 위치 기준)
export const FARM_FIELD = { top: 0.42, bottom: 0.86 } as const;

export function FarmBackground() {
  return <Image source={FARM_IMAGE} resizeMode="cover" className="absolute inset-0 h-full w-full" />;
}
