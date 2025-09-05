import React from 'react';
import bridgeUtils from '../utils/bridgeUtils';

export default function BridgeExample() {
  const handleGithubLogin = () => {
    bridgeUtils.requestGithubLogin();
  };

  const handleLogout = () => {
    bridgeUtils.requestLogout();
  };

  const handleCustomMessage = () => {
    bridgeUtils.sendCustomMessage('CUSTOM_ACTION', {
      action: 'example',
      timestamp: Date.now(),
    });
  };

  const isBridgeAvailable = bridgeUtils.isAvailable();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>웹뷰 브릿지 예시</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>브릿지 상태:</strong> {isBridgeAvailable ? '✅ 사용 가능' : '❌ 사용 불가'}
        </p>
        <p>
          <small>
            {isBridgeAvailable 
              ? 'React Native 앱 내에서 실행 중입니다.' 
              : '일반 웹 브라우저에서 실행 중입니다.'}
          </small>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleGithubLogin}
          style={{
            padding: '12px 20px',
            backgroundColor: '#24292e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          GitHub로 로그인
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: '12px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          로그아웃
        </button>

        <button
          onClick={handleCustomMessage}
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          커스텀 메시지 전송
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <h3>사용법</h3>
        <ul>
          <li><strong>GitHub 로그인:</strong> 앱에서 GitHub OAuth 로그인을 처리합니다.</li>
          <li><strong>로그아웃:</strong> 웹뷰와 앱 모두에서 로그아웃을 처리합니다.</li>
          <li><strong>커스텀 메시지:</strong> 앱으로 임의의 메시지를 전송할 수 있습니다.</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
        <h3>메시지 타입</h3>
        <p><strong>웹뷰 → 앱:</strong></p>
        <ul>
          <li><code>GITHUB_LOGIN</code> - GitHub 로그인 요청</li>
          <li><code>LOGOUT</code> - 로그아웃 요청</li>
          <li><code>REQUEST_AUTH</code> - 인증 요청</li>
          <li><code>navigation</code> - 네비게이션 상태</li>
        </ul>
        
        <p><strong>앱 → 웹뷰:</strong></p>
        <ul>
          <li><code>SET_TOKEN</code> - 토큰 설정</li>
          <li><code>LOGOUT</code> - 로그아웃 요청</li>
        </ul>
      </div>
    </div>
  );
}
