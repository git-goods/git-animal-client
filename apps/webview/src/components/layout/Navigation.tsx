import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@gitanimals/ui-tailwind';
import { authUtils } from '../../utils';
import { ROUTES } from '../../router/constants';
// import LanguageSwitcher from '../LanguageSwitcher';

function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authUtils.isAuthenticated();

  const handleLogout = () => {
    // 웹뷰 환경에서는 브릿지를 통해 앱에 로그아웃 요청
    authUtils.logout();
    navigate(ROUTES.AUTH);
  };

  const publicNavItems = [
    { path: ROUTES.ABOUT, label: t('navigation.about'), icon: 'ℹ️' },
    { path: ROUTES.AUTH, label: t('navigation.login'), icon: '🔐' },
  ];

  const protectedNavItems = [
    { path: ROUTES.HOME, label: t('navigation.home'), icon: '🏠' },
    { path: ROUTES.PROFILE, label: t('navigation.profile'), icon: '👤' },
    { path: ROUTES.SETTINGS, label: t('navigation.settings'), icon: '⚙️' },
  ];

  const navItems = isAuthenticated ? protectedNavItems : publicNavItems;

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={isAuthenticated ? ROUTES.HOME : ROUTES.ABOUT}>
            <h1 className="cursor-pointer text-lg font-bold">GitAnimals</h1>
          </Link>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? 'flex items-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-sm text-blue-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600'
                    : 'flex items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600'
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <LanguageSwitcher /> */}
          {!isAuthenticated && (
            <Link to={ROUTES.ABOUT}>
              <Button variant="secondary" size="s">
                {t('navigation.about')}
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Button variant="secondary" size="s" onClick={handleLogout}>
              {t('settings.logout')}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
