import React from 'react';
import { css } from '_panda/css';

const SolvingSection = () => {
  return <div className={containerStyle}>solving</div>;
};

export default SolvingSection;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingInline: '16px',
  backgroundColor: 'gray.gray_050',
});
