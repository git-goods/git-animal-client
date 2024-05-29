import type { ProductStatusType } from '@/schema/action';

import SmallButton from './SmallButton';

interface PaymentStateButtonProps {
  label: string;
  color: string;
}

// TODO: disabled 추가
function ActionButton({
  paymentState,
  onClick,
  label,
}: {
  paymentState: ProductStatusType;
  onClick: () => void;
  label?: string;
}) {
  const PAYMENT_STATE_BUTTON: Record<ProductStatusType, PaymentStateButtonProps> = {
    ON_SALE: {
      label: 'buy!',
      color: '#00B2FF',
    },
    SOLD_OUT: {
      label: 'cancel!',
      color: '#FF0000',
    },
    MY_SELLING: {
      label: 'cancel!',
      color: '#FF0000',
    },
    SELL: {
      label: 'sell!',
      color: '#00B2FF',
    },
    SELL_HISTORY: {
      label: label as string,
      color: '#FC899A',
    },
  };

  return (
    <SmallButton onClick={onClick} color={PAYMENT_STATE_BUTTON[paymentState].color}>
      {PAYMENT_STATE_BUTTON[paymentState].label}
    </SmallButton>
  );
}

export default ActionButton;
