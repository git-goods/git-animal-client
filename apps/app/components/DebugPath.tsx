// components/DebugPath.tsx
import { View, Text, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';

export default function DebugPath() {
  const pathname = usePathname();

  // 개발 모드에서만 표시
  if (__DEV__) {
    return (
      <View style={styles.container}>
        <Text style={styles.pathText}>📍 {pathname}</Text>
      </View>
    );
  }

  // 프로덕션 모드에서는 렌더링 안함
  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  pathText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
