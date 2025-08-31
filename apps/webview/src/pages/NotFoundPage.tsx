import { Button } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={mainCss}>
      <h1 className={h1Css}>404</h1>
      <div className={pCss}>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      </div>
      <div className={buttonCss}>
        <Button onClick={handleGoBack} variant="secondary">
          이전 페이지로
        </Button>
        <Button onClick={handleGoHome}>
          홈으로 가기
        </Button>
      </div>
    </main>
  );
}

const buttonCss = css({
  display: 'flex',
  justifyContent: 'center',
  w: '100%',
  gap: '16px',
});

const mainCss = css({
  backgroundColor: 'white',
  w: '100dvw',
  h: '100dvh',
  textStyle: 'glyph16.regular',
  padding: '0 16px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const h1Css = css({
  textStyle: 'glyph40.bold',
  marginBottom: '12px',
});

const pCss = css({
  marginBottom: '32px',
  textAlign: 'center',
  '& a': {
    textDecoration: 'underline',
    color: 'blue',
  },
});

export default NotFoundPage;