import React from 'react';

import type { ProductStatusType } from '@/schema/action';

import SmallButton from './SmallButton';

const PAYMENT_STATE_BUTTON_TEXT: Record<ProductStatusType, string> = {
  ON_SALE: 'buy!',
  SOLD_OUT: 'cancel!',
};

function ActionButton({ paymentState, onClick }: { paymentState: ProductStatusType; onClick: () => void }) {
  return <SmallButton onClick={onClick}>{PAYMENT_STATE_BUTTON_TEXT[paymentState]}</SmallButton>;
}

export default ActionButton;
