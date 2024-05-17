import styled from 'styled-components';

import type { SnackBarProps } from '@/store/snackBar';

export const SnackBar = ({ id, message, showClose, onClose, ...props }: SnackBarProps) => {
  const handleClose = () => {
    onClose?.(id);
  };

  return (
    <SnackBarStyled showClose={showClose} onClick={handleClose} {...props}>
      {message}
    </SnackBarStyled>
  );
};

const SnackBarStyled = styled.button<Pick<SnackBarProps, 'showClose'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background-image: url('/snackbar-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 306px;
  height: 82px;

  padding: 0 16px;

  font-size: 18px;
`;
