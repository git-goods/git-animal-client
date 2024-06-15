import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import Button from '../Button';

import { SnackBarProvider } from './SnackBarProvider';
import { useSnackBar } from './useSnackBar';
import { SnackBar } from '.';

const meta: Meta<typeof SnackBar> = {
  title: 'SnackBar',
  component: SnackBar,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <SnackBarWrapper>
      <SnackBar id="1" message="스낵바" />
      <SnackBar id="2" message="취소 버튼이 있는 스낵바" showClose />
    </SnackBarWrapper>
  );
};

export const Example = () => {
  const { showSnackBar } = useSnackBar();

  const handleClickShowSnackBar = () => {
    showSnackBar({ message: '스낵바 메시지' });
  };

  const handleClickShowSnackBarWithCancel = () => {
    showSnackBar({ message: '취소 버튼 있는 스낵바 메시지', showClose: true });
  };

  return (
    <SnackBarWrapper>
      <SnackBarProvider />
      <SnackBarButton onClick={handleClickShowSnackBar}>스낵바 표시</SnackBarButton>
      <SnackBarButton onClick={handleClickShowSnackBarWithCancel}>취소 버튼 있는 스낵바 표시</SnackBarButton>
    </SnackBarWrapper>
  );
};

const SnackBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SnackBarButton = styled(Button)`
  width: 200px;
  background-color: ${({ theme }) => theme.color.green_300};
`;
