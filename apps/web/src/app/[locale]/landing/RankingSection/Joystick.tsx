import { motion } from 'framer-motion';

export function Joystick({ joystickRotation }: { joystickRotation: number }) {
  return (
    <>
      {' '}
      <g>
        <rect x="334" y="1264" width="66" height="84" fill="#2F453B" />
        <rect x="368" y="1264" width="32" height="84" fill="#213333" />
      </g>
      {/* Joystick Top Part - Interactive with pivot at bottom */}
      <motion.g
        animate={{ rotate: joystickRotation }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ originX: 0.5, originY: 1, transformBox: 'fill-box', transformOrigin: '367px 1264px' }}
      >
        <rect x="333.667" y="1064" width="66.6667" height="33.3333" fill="#01BB66" />
        <rect x="333.667" y="1230.67" width="66.6667" height="33.3333" fill="#D8B91E" />
        <rect x="300.333" y="1097.33" width="133.333" height="33.3333" fill="#F8DA43" />
        <rect x="300.333" y="1197.33" width="133.333" height="33.3333" fill="#F8DA43" />
        <rect x="267" y="1130.67" width="200" height="66.6667" fill="#F8DA43" />
        <rect x="400.333" y="1197.33" width="33.3333" height="33.3333" fill="#D8B91E" />
        <rect x="433.667" y="1130.67" width="33.3333" height="66.6667" fill="#D8B91E" />
        <rect x="300.333" y="1097.33" width="33.3333" height="33.3333" fill="#FFED93" />
        <rect x="333.667" y="1064" width="66.6667" height="33.3333" fill="#FFED93" />
        <rect x="267" y="1130.67" width="33.3333" height="66.6667" fill="#FFED93" />
      </motion.g>
    </>
  );
}
