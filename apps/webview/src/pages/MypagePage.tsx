import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '@/utils';
import { ROUTES } from '@/router/constants';
import { useNavigate } from 'react-router-dom';

function MyPagePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = authUtils.isAuthenticated();
  const handleLogout = () => {
    // 웹뷰 환경에서는 브릿지를 통해 앱에 로그아웃 요청
    authUtils.logout();
    navigate(ROUTES.AUTH);
  };

  return (
    <div
      className={css({
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      })}
    >
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '2rem',
        })}
      >
        {t('profile.title')}
      </h1>

      <Button variant="secondary" size="s" onClick={handleLogout}>
        {t('settings.logout')}
      </Button>

      <button onClick={() => navigate('/dev')}>dev</button>
    </div>
  );
}

export default MyPagePage;
