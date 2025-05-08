import { css } from '_panda/css';
import { Slot } from '@radix-ui/react-slot';
/**
 * 화면 크기에 따라 다른 컴포넌트를 렌더링하는 컴포넌트
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} [props.mobile] - 모바일 화면에서 표시될 컴포넌트
 * @param {React.ReactNode} [props.desktop] - 데스크톱 화면에서 표시될 컴포넌트
 * @returns {JSX.Element} 화면 크기에 따라 조건부로 렌더링되는 컴포넌트
 */
export const MediaQuery = (props: { mobile?: React.ReactNode; desktop?: React.ReactNode }) => {
  return (
    <>
      <Slot className={mobileStyle}>{props.mobile}</Slot>
      <Slot className={desktopStyle}>{props.desktop}</Slot>
    </>
  );
};

const mobileStyle = css({
  display: 'none',
  _mobile: {
    display: 'block',
  },
});

const desktopStyle = css({
  display: 'block',
  _mobile: {
    display: 'none',
  },
});
