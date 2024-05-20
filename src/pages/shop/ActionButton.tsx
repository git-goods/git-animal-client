import type { ProductStatusType } from '@/schema/action';

import SmallButton from './SmallButton';

interface PaymentStateButtonProps {
  label: string;
  color: string;
}

const PAYMENT_STATE_BUTTON: Record<ProductStatusType, PaymentStateButtonProps> = {
  ON_SALE: {
    label: 'buy!',
    color: '#00B2FF',
  },
  SOLD_OUT: {
    label: 'cancel!',
    color: '#FF0000',
  },
  SELL: {
    label: 'sell!',
    color: '#00B2FF',
  },
};

function ActionButton({ paymentState, onClick }: { paymentState: ProductStatusType; onClick: () => void }) {
  return <SmallButton onClick={onClick}>{PAYMENT_STATE_BUTTON[paymentState].label}</SmallButton>;
}

export default ActionButton;
