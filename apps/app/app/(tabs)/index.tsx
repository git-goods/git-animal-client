import { useEffect } from 'react';
import { router } from 'expo-router';
import CustomWebView from '../../components/CustomWebView';
import { useAuth } from '../../hooks/useAuth';

export default function TabOneScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <CustomWebView url="https://www.gitanimals.org/" />;
}
