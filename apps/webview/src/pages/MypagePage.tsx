import { useTranslation } from 'react-i18next';
import { Button } from '@gitanimals/ui-tailwind';
import { authUtils } from '@/utils';
import { ROUTES } from '@/router/constants';
import { useNavigate } from 'react-router-dom';
import { NATIVE_CUSTOM_EVENTS } from '@/constants/app';

function MyPagePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    // 웹뷰 환경에서는 브릿지를 통해 앱에 로그아웃 요청
    authUtils.logout();
    navigate(ROUTES.AUTH);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.LOGOUT,
      }),
    );
  };

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-8 p-8">
      <h1 className="mb-8 text-2xl font-bold">{t('profile.title')}</h1>

      <Button variant="secondary" size="s" onClick={handleLogout}>
        {t('settings.logout')}
      </Button>

      <button type="button" onClick={() => navigate('/dev')}>
        dev
      </button>
    </div>
  );
}

export default MyPagePage;
