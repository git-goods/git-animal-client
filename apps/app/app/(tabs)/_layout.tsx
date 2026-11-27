import { Tabs } from 'expo-router/js-tabs';
import { PixelTabBar } from '../../src/ui/pixel/PixelTabBar';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <PixelTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shop" />
      <Tabs.Screen name="game" />
      <Tabs.Screen name="mypage" />
    </Tabs>
  );
}
