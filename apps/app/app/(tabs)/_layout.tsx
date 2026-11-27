import { Tabs } from 'expo-router/js-tabs';
import { TabBar } from '../../src/ui/TabBar';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shop" />
      <Tabs.Screen name="game" />
      <Tabs.Screen name="mypage" />
    </Tabs>
  );
}
