import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function IndexScreen() {
  return <Redirect href="/auth/login" />;
}
