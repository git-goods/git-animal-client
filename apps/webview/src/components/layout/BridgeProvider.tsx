import { linkBridge } from '@webview-bridge/web';
import { authUtils } from '@/utils';

export const bridge = linkBridge({
  onReady: async (method) => {
    method.setReady(true);
    const version = await method.getBridgeVersion();
    console.log('currentBridgerVersion', version);
    // 초기 토큰 가져오기
    try {
      const initialToken = await method.getInitialToken();
      console.log('initialToken', initialToken);
      authUtils.setTokensFromParent(initialToken);
    } catch (error) {
      console.error('Failed to get initial token:', error);
    }
  },
});
