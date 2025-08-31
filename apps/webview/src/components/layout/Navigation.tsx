import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@gitanimals/ui-panda';
import { css } from '../../../styled-system/css';
import { authUtils } from '../../utils';
import { ROUTES } from '../../router/constants';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authUtils.isAuthenticated();

  const handleLogout = () => {
    authUtils.logout();
    navigate(ROUTES.AUTH);
  };

  const publicNavItems = [
    { path: ROUTES.ABOUT, label: 'About', icon: 'ℹ️' },
    { path: ROUTES.AUTH, label: 'Login', icon: '🔐' },
  ];

  const protectedNavItems = [
    { path: ROUTES.HOME, label: 'Home', icon: '🏠' },
    { path: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
    { path: ROUTES.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  const navItems = isAuthenticated ? protectedNavItems : publicNavItems;

  return (
    <nav
      className={css({
        padding: '1rem',
        borderBottom: '1px solid',
        borderColor: 'gray.200',
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      })}
    >
      <div
        className={css({
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <div className={css({ display: 'flex', gap: '1rem', alignItems: 'center' })}>
          <Link to={isAuthenticated ? ROUTES.HOME : ROUTES.ABOUT}>
            <h1 className={css({ fontSize: 'lg', fontWeight: 'bold', cursor: 'pointer' })}>GitAnimals</h1>
          </Link>
          <div className={css({ display: 'flex', gap: '0.5rem' })}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={css({
                  padding: '0.5rem 1rem',
                  borderRadius: 'md',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'sm',
                  transition: 'all 0.2s',
                  backgroundColor: location.pathname === item.path ? 'blue.100' : 'transparent',
                  color: location.pathname === item.path ? 'blue.700' : 'gray.600',
                  _hover: {
                    backgroundColor: 'blue.50',
                    color: 'blue.600',
                  },
                })}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className={css({ display: 'flex', gap: '0.5rem', alignItems: 'center' })}>
          {!isAuthenticated && (
            <Link to={ROUTES.ABOUT}>
              <Button variant="secondary" size="s">About</Button>
            </Link>
          )}
          {isAuthenticated && (
            <Button variant="secondary" size="s" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;