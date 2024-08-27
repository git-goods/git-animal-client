import { css } from '_panda/css';

import { SUMI_GITHUB_URL } from '@/constants/outlink';

function Footer() {
  return (
    <footer className={footerStyle}>
      <button>
        <img src="/icon/github.png" alt="github" width={24} height={24} />
      </button>
      <p>
        made by <a href={SUMI_GITHUB_URL}>sumi-0011</a>
      </p>
    </footer>
  );
}

export default Footer;

const footerStyle = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  right: '0',
  padding: '24px',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignItems: 'flex-end',
  color: '#fff',
  lineHeight: '140%',
  gap: '4px',
  '& a': {
    color: '#fff',
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    paddingLeft: '6px',
  },
});
