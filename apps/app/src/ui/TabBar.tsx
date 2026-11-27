import { Image, Pressable, Text, View } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { sans } from './sans';

// 피그마 943:11704 Appbar-bottom: 내용 높이 56(위 12, 아래 4) + 홈 인디케이터 영역
export const TAB_BAR_HEIGHT = 56;

const ICONS: Record<string, number> = {
  index: require('../../assets/ui/tab-home.png'),
  shop: require('../../assets/ui/tab-shop.png'),
  game: require('../../assets/ui/tab-game.png'),
  mypage: require('../../assets/ui/tab-mypage.png'),
};

const LABEL_KEYS: Record<string, string> = {
  index: 'tabs.home',
  shop: 'tabs.shop',
  game: 'tabs.game',
  mypage: 'tabs.mypage',
};

// 화면 위에 떠서 둥근 위 모서리 뒤로 화면이 보이게 한다
export function TabBar({ state, emitter, navigateToTab, insets }: BottomTabBarProps) {
  const { t } = useTranslation();

  return (
    <View
      className="absolute inset-x-0 bottom-0 flex-row justify-between"
      style={{
        backgroundColor: colors.gray['100'],
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 12,
        paddingBottom: insets.bottom + 4,
        paddingHorizontal: 40,
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? colors['white-alpha']['90'] : colors['white-alpha']['25'];
        const label = t(LABEL_KEYS[route.name] ?? route.name);

        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            className="items-center"
            style={{ width: 60, gap: 2 }}
          >
            <Image source={ICONS[route.name]} tintColor={color} style={{ width: 20, height: 20 }} />
            <Text style={[sans(12, 1.5), { color, textAlign: 'center' }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
