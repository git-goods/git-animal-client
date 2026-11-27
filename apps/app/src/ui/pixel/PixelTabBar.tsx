import { Pressable, View } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { PixelSprite } from './PixelSprite';
import { PixelText } from './PixelText';

const SCALE = 3;
const ICON_SIZE = 16 * SCALE;

const ICONS: Record<string, number> = {
  index: require('../../../assets/ui/tab-home.png'),
  shop: require('../../../assets/ui/tab-shop.png'),
  game: require('../../../assets/ui/tab-game.png'),
  mypage: require('../../../assets/ui/tab-mypage.png'),
};

const LABEL_KEYS: Record<string, string> = {
  index: 'tabs.home',
  shop: 'tabs.shop',
  game: 'tabs.game',
  mypage: 'tabs.mypage',
};

const SELECTED = colors.brand.canary;
const UNSELECTED = colors.gray['600'];

export function PixelTabBar({ state, emitter, navigateToTab, insets }: BottomTabBarProps) {
  const { t } = useTranslation();

  return (
    <View
      className="flex-row bg-gray-000"
      style={{
        paddingTop: SCALE * 2,
        paddingBottom: insets.bottom + SCALE * 3,
        borderTopWidth: SCALE,
        borderTopColor: colors.gray['400'],
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? SELECTED : UNSELECTED;
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
            className="flex-1 items-center justify-end"
            style={{ transform: [{ translateY: focused ? -SCALE : 0 }] }}
          >
            <PixelSprite source={ICONS[route.name]} tintColor={color} maxWidth={ICON_SIZE} maxHeight={ICON_SIZE} />
            <PixelText variant="glyph12" style={{ color }}>
              {label}
            </PixelText>
          </Pressable>
        );
      })}
    </View>
  );
}
