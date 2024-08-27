import React from 'react';
import { css, cx } from '_panda/css';

import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { prevTextTokenBlack2 } from '@/styles/prevTextToken';
import { addNumberComma } from '@/utils/number';

function PointInfo() {
  const { data: userData } = useGetSuspenseUser();
  return <p className={pointStyle}>Points: {addNumberComma(userData.points)}</p>;
}

export default PointInfo;

const pointStyle = cx(
  css({
    color: '#fff',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '140%',
  }),
  prevTextTokenBlack2,
);
