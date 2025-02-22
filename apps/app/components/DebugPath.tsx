import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments } from 'expo-router';
import * as Linking from 'expo-linking';

export default function DebugPath() {
  const pathname = usePathname();
  const segments = useSegments();
  const url = Linking.createURL(pathname);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Path: {pathname}</Text>
      <Text style={styles.text}>Segments: {segments.join(' / ')}</Text>
      <Text style={styles.text}>Full URL: {url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
