'use client';

interface ControlPanelProps {
  joystickRotation: number;
  onJoystickMove: (x: number, y: number) => void;
  isPowered: boolean;
}

export default function ControlPanel({ joystickRotation, onJoystickMove, isPowered }: ControlPanelProps) {
  // 조이스틱 클릭 처리
  const handleJoystickClick = (direction: string) => {
    if (!isPowered) return;

    switch (direction) {
      case 'up':
        onJoystickMove(0, -1);
        break;
      case 'down':
        onJoystickMove(0, 1);
        break;
      case 'left':
        onJoystickMove(-1, 0);
        break;
      case 'right':
        onJoystickMove(1, 0);
        break;
      case 'upLeft':
        onJoystickMove(-0.7, -0.7);
        break;
      case 'upRight':
        onJoystickMove(0.7, -0.7);
        break;
      case 'downLeft':
        onJoystickMove(-0.7, 0.7);
        break;
      case 'downRight':
        onJoystickMove(0.7, 0.7);
        break;
    }
  };

  return (
    <g>
      {/* 조이스틱 베이스 */}
      <rect x="276" y="1737" width="182" height="40" fill="#1C2923" />

      {/* 조이스틱 방향 컨트롤 - 투명한 클릭 영역 */}
      <g>
        {/* 위 */}
        <rect
          x="334"
          y="1453"
          width="67"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('up')}
        />

        {/* 아래 */}
        <rect
          x="334"
          y="1620"
          width="67"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('down')}
        />

        {/* 왼쪽 */}
        <rect
          x="267"
          y="1520"
          width="33"
          height="67"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('left')}
        />

        {/* 오른쪽 */}
        <rect
          x="434"
          y="1520"
          width="33"
          height="67"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('right')}
        />

        {/* 왼쪽 위 */}
        <rect
          x="300"
          y="1486"
          width="33"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('upLeft')}
        />

        {/* 오른쪽 위 */}
        <rect
          x="400"
          y="1486"
          width="33"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('upRight')}
        />

        {/* 왼쪽 아래 */}
        <rect
          x="300"
          y="1586"
          width="33"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('downLeft')}
        />

        {/* 오른쪽 아래 */}
        <rect
          x="400"
          y="1586"
          width="33"
          height="33"
          fill="rgba(255,0,0,0.01)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleJoystickClick('downRight')}
        />
      </g>

      {/* 조이스틱 - 회전 애니메이션 개선 */}
      <g
        style={{
          cursor: 'pointer',
          transformOrigin: '367px 1553px', // 조이스틱 중심점으로 변경
          transform: `rotate(${joystickRotation}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <rect x="333.668" y="1453" width="66.6667" height="33.3333" fill="#01BB66" />
        <rect x="333.668" y="1619.67" width="66.6667" height="33.3333" fill="#D8B91E" />
        <rect x="334" y="1653" width="66" height="84" fill="#2F453B" />
        <rect x="368" y="1653" width="32" height="84" fill="#213333" />
        <rect x="300.332" y="1486.33" width="133.333" height="33.3333" fill="#F8DA43" />
        <rect x="300.332" y="1586.33" width="133.333" height="33.3333" fill="#F8DA43" />
        <rect x="267" y="1519.67" width="200" height="66.6667" fill="#F8DA43" />
        <rect x="400.332" y="1586.33" width="33.3333" height="33.3333" fill="#D8B91E" />
        <rect x="433.668" y="1519.67" width="33.3333" height="66.6667" fill="#D8B91E" />
        <rect x="300.332" y="1486.33" width="33.3333" height="33.3333" fill="#FFED93" />
        <rect x="333.668" y="1453" width="66.6667" height="33.3333" fill="#FFED93" />
        <rect x="267" y="1519.67" width="33.3333" height="66.6667" fill="#FFED93" />
      </g>
    </g>
  );
}
