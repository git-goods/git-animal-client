import { center } from '_panda/patterns';

import LoginButton from './LoginButton';

function JWTPage({
  searchParams,
}: {
  searchParams: {
    jwt: string;
  };
}) {
  const jwtToken = searchParams.jwt;
  const token = jwtToken.split(' ')[1];

  return (
    <div className={loadingContainerStyle}>
      Loading....
      <div style={{ visibility: 'hidden' }}>
        <LoginButton token={token} />
      </div>
    </div>
  );
}

export default JWTPage;

const loadingContainerStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '36px',
});
