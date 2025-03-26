const COLOR_PALLETE = {
  green: ['#01BB66', '#00A057'],
  teal: ['#00D1A7', '#00B294'],
  blue: ['#198BE5', '#1A77C0'],
};

export default function GameButton({
  onClick,
  active,
  label,
  startX,
  startY,
  color,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  startX: number;
  startY: number;
  color: keyof typeof COLOR_PALLETE;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onClick();
  };

  const moveStyle = {
    transform: active ? 'translateY(10px)' : 'translateY(0)',
    transition: 'transform 0.1s ease-in-out',
  };

  return (
    <g onClick={handleClick} style={{ cursor: 'pointer' }}>
      <rect style={moveStyle} x={startX} y={startY} width="140" height="40" fill={COLOR_PALLETE[color][0]} />
      <rect style={moveStyle} x={startX} y={startY + 40} width="140" height="20" fill={COLOR_PALLETE[color][1]} />
      <rect style={moveStyle} x={startX + 120} y={startY} width="20" height="20" fill="#7FE18F" />
      <rect x={startX} y={startY} width="20" height="20" fill="#7FE18F" />
      <rect x={startX - 21} y={startY + 60} width="182" height="40" fill="#1C2923" />
      {/* 
      <text
        x={startX + 70}
        y={startY + 50}
        fill="#FFFFFF"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        {label}
      </text> */}
    </g>
  );
}
