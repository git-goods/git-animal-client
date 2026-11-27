import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from '../ui/TabBar';

// 피그마 place-su 의 background-home (3배 export)
export const FARM_IMAGE = require('../../assets/home/farm.png');
// 이미지 높이 대비 잔디밭 범위 (발 위치 기준)
export const FARM_FIELD = { top: 0.42, bottom: 0.86 } as const;
// 이미지 위 가장자리 색. 상태바 아래 빈 곳을 이어 칠한다
const FARM_EDGE = '#098761';

// 피그마처럼 상태바 아래 11px 부터 탭바 위까지 그림을 깐다
export function FarmBackground() {
  const insets = useSafeAreaInsets();
  return (
    <View className="absolute inset-0" style={{ backgroundColor: FARM_EDGE }}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: insets.top + 11, bottom: TAB_BAR_HEIGHT + insets.bottom }}>
        <Image source={FARM_IMAGE} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      </View>
    </View>
  );
}
