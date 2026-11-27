import type { ReactNode } from 'react';
import { Image, View } from 'react-native';

// 네이티브 스플래시가 로고를 화면 가운데 두므로 JS 스플래시와 로그인도 같은 자리에 둬 로고가 움직이지 않게 한다
export function CenterLogo({ children, onLoadEnd }: { children?: ReactNode; onLoadEnd?: () => void }) {
  return (
    <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
      <View>
        {/* 피그마 로고 SVG 를 3배(726×198)로 래스터화한 것 */}
        <Image
          source={require('../../assets/brand/logo.png')}
          style={{ width: 242, height: 66 }}
          accessibilityLabel="Git Animals"
          onLoadEnd={onLoadEnd}
        />
        {children}
      </View>
    </View>
  );
}
