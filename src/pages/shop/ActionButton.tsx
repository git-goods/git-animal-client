import SmallButton from './SmallButton';

// TODO: disabled 추가
function ActionButton({
  // paymentState,
  color,
  onClick,
  label,
}: {
  color: string;
  onClick: () => void;
  label?: string;
}) {
  return (
    <SmallButton onClick={onClick} color={color}>
      {label}
    </SmallButton>
  );
}

export default ActionButton;
