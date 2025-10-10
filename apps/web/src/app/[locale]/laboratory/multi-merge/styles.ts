import { css } from '_panda/css';

// Modal 스타일
export const modalOverlayStyle = css({
  position: 'fixed',
  inset: '0',
  background: 'black.black_95',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  zIndex: 'modal',
});

export const modalContainerStyle = css({
  background: 'black.black_100',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '80rem',
  maxHeight: '95vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

// Header 스타일
export const headerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 32px',
});

export const titleStyle = css({
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'white.white_100',
});

export const closeButtonStyle = css({
  color: 'gray.gray_400',
  transition: 'colors',
  cursor: 'pointer',
  _hover: {
    color: 'white.white_100',
  },
});

// Content 스타일
export const contentSectionStyle = css({
  padding: '24px 32px',
});

export const instructionTextStyle = css({
  padding: '0 32px 16px',
});

export const instructionStyle = css({
  color: 'gray.gray_400',
  fontSize: '14px',
  textAlign: 'center',
});

// Filter 스타일
export const filterSectionStyle = css({
  padding: '0 32px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '12px',
});

export const selectStyle = css({
  background: 'gray.gray_200',
  color: 'gray.gray_400',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  border: '1px solid',
  borderColor: 'gray.gray_300',
  outline: 'none',
  _focus: {
    borderColor: 'gray.gray_400',
  },
});

// Button 스타일
export const mergeButtonStyle = css({
  width: '100%',
  padding: '16px',
  background: 'gray.gray_400',
  color: 'gray.gray_600',
  fontWeight: 'bold',
  borderRadius: '12px',
  fontSize: '18px',
  transition: 'all',
  cursor: 'pointer',
  _hover: {
    background: 'gray.gray_300',
  },
  _disabled: {
    background: 'gray.gray_300',
    color: 'gray.gray_500',
    cursor: 'not-allowed',
    _hover: {
      background: 'gray.gray_300',
    },
  },
});
