'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

const characters = [
  {
    id: 1,
    name: '아스트라',
    type: '마법',
    rarity: '레전더리',
    hp: 95,
    attack: 88,
    defense: 75,
    speed: 92,
    image: '/placeholder.svg?height=200&width=200&text=✨',
    color: '#a855f7',
    borderColor: '#9333ea',
    gradientFrom: '#a855f7',
    gradientTo: '#4f46e5',
    description: '고대의 마법을 다루는 신비로운 마법사. 별의 힘을 빌려 강력한 주문을 사용합니다.',
  },
  {
    id: 2,
    name: '블레이즈',
    type: '불꽃',
    rarity: '에픽',
    hp: 85,
    attack: 95,
    defense: 70,
    speed: 88,
    image: '/placeholder.svg?height=200&width=200&text=🔥',
    color: '#f97316',
    borderColor: '#ea580c',
    gradientFrom: '#f97316',
    gradientTo: '#dc2626',
    description: '불의 정령과 계약한 전사. 화염을 자유자재로 다루며 적을 태워버립니다.',
  },
  {
    id: 3,
    name: '아쿠아',
    type: '물',
    rarity: '에픽',
    hp: 90,
    attack: 75,
    defense: 92,
    speed: 85,
    image: '/placeholder.svg?height=200&width=200&text=💧',
    color: '#3b82f6',
    borderColor: '#2563eb',
    gradientFrom: '#3b82f6',
    gradientTo: '#0891b2',
    description: '심해의 비밀을 간직한 인어공주. 물의 힘으로 치유와 보호 마법을 사용합니다.',
  },
  {
    id: 4,
    name: '테라',
    type: '대지',
    rarity: '레어',
    hp: 100,
    attack: 85,
    defense: 95,
    speed: 65,
    image: '/placeholder.svg?height=200&width=200&text=🌿',
    color: '#22c55e',
    borderColor: '#16a34a',
    gradientFrom: '#22c55e',
    gradientTo: '#059669',
    description: '자연과 하나가 된 드루이드. 식물을 조종하고 대지의 힘을 끌어올립니다.',
  },
  {
    id: 5,
    name: '볼트',
    type: '번개',
    rarity: '에픽',
    hp: 80,
    attack: 92,
    defense: 70,
    speed: 98,
    image: '/placeholder.svg?height=200&width=200&text=⚡',
    color: '#eab308',
    borderColor: '#ca8a04',
    gradientFrom: '#eab308',
    gradientTo: '#d97706',
    description: '번개의 속도를 가진 스피드스터. 전기 충격으로 적을 마비시킵니다.',
  },
  {
    id: 6,
    name: '루나',
    type: '달빛',
    rarity: '레전더리',
    hp: 88,
    attack: 78,
    defense: 85,
    speed: 90,
    image: '/placeholder.svg?height=200&width=200&text=��',
    color: '#6366f1',
    borderColor: '#4f46e5',
    gradientFrom: '#6366f1',
    gradientTo: '#7c3aed',
    description: '달의 여신의 축복을 받은 예언자. 미래를 보는 능력과 환상 마법을 사용합니다.',
  },
  {
    id: 7,
    name: '프로스트',
    type: '얼음',
    rarity: '레어',
    hp: 82,
    attack: 75,
    defense: 90,
    speed: 78,
    image: '/placeholder.svg?height=200&width=200&text=❄️',
    color: '#06b6d4',
    borderColor: '#0891b2',
    gradientFrom: '#06b6d4',
    gradientTo: '#2563eb',
    description: '영원한 겨울의 수호자. 얼음과 눈을 조종하여 적을 얼려버립니다.',
  },
];

export function CardDrawingGame() {
  const [gameState, setGameState] = useState<'ready' | 'drawing' | 'selected'>('ready');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Start a new drawing session
  const startDrawing = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGameState('drawing');

    // Randomly select 5 cards
    const allCardIds = characters.map((char) => char.id);
    const shuffled = [...allCardIds].sort(() => 0.5 - Math.random());
    const newSelectedCards = shuffled.slice(0, 5);

    setSelectedCards(newSelectedCards);
    setSelectedCardIndex(null);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Handle card selection
  const selectCard = (index: number) => {
    if (isAnimating || gameState !== 'drawing') return;

    setIsAnimating(true);
    setSelectedCardIndex(index);
    setGameState('selected');

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Reset the game
  const resetGame = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGameState('ready');
    setSelectedCards([]);
    setSelectedCardIndex(null);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Calculate positions for fan layout
  const getFanPosition = (index: number, total: number) => {
    // Fan cards in a semi-circle
    const radius = 40; // virtual radius for the fan
    const totalAngle = 80; // total angle of the fan in degrees
    const startAngle = -40; // starting angle (negative means left side)

    // Calculate angle for this card
    const angle = startAngle + (index / (total - 1)) * totalAngle;

    // Convert to radians
    const radians = (angle * Math.PI) / 180;

    // Calculate position
    const x = Math.sin(radians) * radius * 2;
    const y = (-Math.cos(radians) * radius) / 2; // Flatten the arc a bit

    // Calculate rotation (cards at edges rotate more)
    const rotate = angle / 1.5; // Adjust the rotation amount

    return { x, y, rotate };
  };

  return (
    <div className={containerStyle}>
      <div className={buttonContainerStyle}>
        {gameState === 'ready' && (
          <Button onClick={startDrawing} disabled={isAnimating} className={primaryButtonStyle} size="l">
            <Sparkles className="mr-2 h-4 w-4" />
            카드 뽑기 시작
          </Button>
        )}

        {gameState === 'selected' && (
          <Button onClick={startDrawing} disabled={isAnimating} className={primaryButtonStyle}>
            다시 뽑기
          </Button>
        )}

        {(gameState === 'drawing' || gameState === 'selected') && (
          <Button onClick={resetGame} disabled={isAnimating} variant="secondary">
            <RotateCcw className="mr-2 h-4 w-4" />
            처음으로
          </Button>
        )}
      </div>

      <div className={gameAreaStyle}>
        {/* Initial prompt */}
        {gameState === 'ready' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={readyPromptStyle}
          >
            <div className="mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                }}
              >
                <Sparkles className={sparklesIconStyle} />
              </motion.div>
            </div>
            <h2 className={promptTitleStyle}>운명의 카드를 뽑아보세요!</h2>
            <p className={promptDescriptionStyle}>
              5장의 카드 중 하나를 선택하여 당신의 운명을 확인하세요. 어떤 캐릭터가 당신을 기다리고 있을까요?
            </p>
          </motion.div>
        )}

        {/* Fan Cards */}
        {gameState === 'drawing' && (
          <div className={cardContainerStyle}>
            {selectedCards.map((cardId, index) => {
              // Calculate fan position
              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              return (
                <motion.div
                  key={`card-${cardId}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateY: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.9,
                    x: x,
                    y: y + 50, // Adjust vertical position
                    rotate: rotate,
                    // rotateY: 180, // Face down
                    transition: {
                      duration: 0.7,
                      type: 'spring',
                      stiffness: 70,
                      delay: index * 0.1,
                    },
                  }}
                  className={cardStyle}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                  }}
                  onClick={() => selectCard(index)}
                  whileHover={{
                    y: y + 30, // Lift card slightly on hover
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                >
                  <CardBack />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Selected Card */}
        {gameState === 'selected' && selectedCardIndex !== null && (
          <div className={cardContainerStyle}>
            {selectedCards.map((cardId, index) => {
              const character = characters.find((c) => c.id === cardId)!;
              const isSelected = index === selectedCardIndex;

              // Calculate fan position
              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              if (isSelected) {
                return (
                  <motion.div
                    key={`selected-card-${cardId}`}
                    initial={{
                      opacity: 1,
                      scale: 0.9,
                      x: x,
                      y: y + 50,
                      rotate: rotate,
                      rotateY: 180, // Face down initially
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1.2,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      rotateY: 0, // Face up
                      transition: {
                        duration: 0.8,
                        type: 'spring',
                        stiffness: 70,
                      },
                    }}
                    className={selectedCardStyle}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      zIndex: 50,
                    }}
                  >
                    <DetailedCard character={character} />
                  </motion.div>
                );
              } else {
                // Non-selected cards fade out
                return (
                  <motion.div
                    key={`nonselected-card-${cardId}`}
                    initial={{
                      opacity: 1,
                      scale: 0.9,
                      x: x,
                      y: y + 50,
                      rotate: rotate,
                      rotateY: 180,
                    }}
                    animate={{
                      opacity: 0.3,
                      scale: 0.7,
                      x: x * 1.5,
                      y: y * 1.5 + 50,
                      rotate: rotate,
                      rotateY: 180,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    className={cardStyle}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                    }}
                  >
                    <CardBack />
                  </motion.div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className={cardBackStyle} style={{ backfaceVisibility: 'hidden' }}>
      <div className={cardBackInnerStyle}>
        <div className={cardBackContentStyle}>
          <motion.div
            animate={{
              rotate: [0, 360],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className={cardBackSparklesStyle} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DetailedCard({ character }: { character: any }) {
  return (
    <div
      className={detailedCardStyle}
      style={{
        backfaceVisibility: 'hidden',
        borderColor: character.borderColor,
      }}
    >
      {/* Card Header with Rarity */}
      <div
        className={cardHeaderStyle}
        style={{
          background: `linear-gradient(to right, ${character.gradientFrom}, ${character.gradientTo})`,
        }}
      >
        <h3 className={cardTitleStyle}>{character.name}</h3>
        <span className={rarityBadgeStyle}>{character.rarity}</span>
      </div>

      {/* Card Image */}
      <div className={cardImageContainerStyle}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cardImageWrapperStyle}
        >
          <img src={character.image || '/placeholder.svg'} alt={character.name} className={cardImageStyle} />
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
            className={cardImageGlowWrapperStyle}
          >
            <div className={cardImageGlowStyle} style={{ backgroundColor: character.color }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Card Type */}
      <div className={cardTypeStyle}>
        <span className={cardTypeTextStyle}>{character.type} 타입</span>
      </div>

      {/* Card Description */}
      <div className={cardDescriptionContainerStyle}>
        <p className={cardDescriptionStyle}>{character.description}</p>

        {/* Card Stats */}
        <div className={cardStatsContainerStyle}>
          <StatBar
            label="HP"
            value={character.hp}
            maxValue={100}
            color={`${character.gradientFrom} ${character.gradientTo}`}
          />
          <StatBar
            label="공격력"
            value={character.attack}
            maxValue={100}
            color={`${character.gradientFrom} ${character.gradientTo}`}
          />
          <StatBar
            label="방어력"
            value={character.defense}
            maxValue={100}
            color={`${character.gradientFrom} ${character.gradientTo}`}
          />
          <StatBar
            label="스피드"
            value={character.speed}
            maxValue={100}
            color={`${character.gradientFrom} ${character.gradientTo}`}
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className={cardFooterStyle}>
        <span className={cardFooterTextStyle}>한정판 #{character.id.toString().padStart(3, '0')}</span>
      </div>
    </div>
  );
}

function StatBar({ label, value, maxValue, color }: { label: string; value: number; maxValue: number; color: string }) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className={statBarContainerStyle}>
      <span className={statLabelStyle}>{label}</span>
      <div className={statBarBackgroundStyle}>
        <motion.div
          className={statBarFillStyle}
          style={{ background: `linear-gradient(to right, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <span className={statValueStyle}>{value}</span>
    </div>
  );
}

// 스타일 정의
const containerStyle = css({
  width: '100%',
  maxWidth: '6xl',
  mx: 'auto',
});

const buttonContainerStyle = flex({
  justifyContent: 'center',
  gap: 4,
  mb: 8,
});

const primaryButtonStyle = css({
  bg: 'indigo.600',
  _hover: {
    bg: 'indigo.700',
  },
});

const gameAreaStyle = css({
  position: 'relative',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const readyPromptStyle = css({
  textAlign: 'center',
});

const sparklesIconStyle = css({
  height: '4rem',
  width: '4rem',
  color: 'indigo.500',
  mx: 'auto',
});

const promptTitleStyle = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'indigo.800',
  mb: 2,
});

const promptDescriptionStyle = css({
  color: 'slate.600',
  maxWidth: 'md',
  mx: 'auto',
});

const cardContainerStyle = css({
  position: 'relative',
  zIndex: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const cardStyle = css({
  position: 'absolute',
  cursor: 'pointer',
});

const selectedCardStyle = css({
  position: 'absolute',
});

const cardBackStyle = css({
  width: '200px',
  height: '300px',
  borderRadius: 'xl',
  overflow: 'hidden',
  border: '4px solid',
  borderColor: 'indigo.300',
  bgGradient: 'to-br',
  gradientFrom: 'indigo.600',
  gradientTo: 'purple.700',
  boxShadow: 'xl',
});

const cardBackInnerStyle = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 6,
});

const cardBackContentStyle = css({
  border: '4px solid',
  borderColor: 'indigo.300',
  borderRadius: 'lg',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'indigo.500/30',
  backdropFilter: 'blur-sm',
});

const cardBackSparklesStyle = css({
  height: '4rem',
  width: '4rem',
  color: 'indigo.200',
});

const detailedCardStyle = css({
  width: '280px',
  height: '420px',
  borderRadius: 'xl',
  overflow: 'hidden',
  border: '4px solid',
  position: 'relative',
  transformStyle: 'preserve-3d',
  bg: 'white',
});

const cardHeaderStyle = css({
  p: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const cardTitleStyle = css({
  fontWeight: 'bold',
  color: 'white',
  fontSize: 'xl',
});

const rarityBadgeStyle = css({
  bg: 'white/90',
  px: 2,
  py: 0.5,
  borderRadius: 'full',
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'indigo.900',
});

const cardImageContainerStyle = css({
  p: 6,
  bgGradient: 'to-b',
  gradientFrom: 'white',
  gradientTo: 'gray.100',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '180px',
  position: 'relative',
});

const cardImageWrapperStyle = css({
  position: 'relative',
});

const cardImageStyle = css({
  height: '9rem',
  width: '9rem',
  objectFit: 'contain',
  zIndex: 10,
  position: 'relative',
});

const cardImageGlowWrapperStyle = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const cardImageGlowStyle = css({
  height: '10rem',
  width: '10rem',
  borderRadius: 'full',
  opacity: 0.2,
  filter: 'blur(8px)',
});

const cardTypeStyle = css({
  bg: 'gray.800',
  py: 1.5,
  px: 3,
  textAlign: 'center',
});

const cardTypeTextStyle = css({
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'white',
});

const cardDescriptionContainerStyle = css({
  p: 4,
  bg: 'white',
});

const cardDescriptionStyle = css({
  fontSize: 'sm',
  color: 'slate.700',
  fontStyle: 'italic',
  mb: 3,
});

const cardStatsContainerStyle = flex({
  direction: 'column',
  gap: 2,
});

const cardFooterStyle = css({
  bgGradient: 'to-r',
  gradientFrom: 'indigo.600',
  gradientTo: 'purple.600',
  p: 2,
  textAlign: 'center',
});

const cardFooterTextStyle = css({
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'white',
});

const statBarContainerStyle = flex({
  alignItems: 'center',
  gap: 2,
});

const statLabelStyle = css({
  fontSize: 'xs',
  fontWeight: 'medium',
  width: '3.5rem',
});

const statBarBackgroundStyle = css({
  flex: 1,
  bg: 'gray.200',
  height: '0.5rem',
  borderRadius: 'full',
  overflow: 'hidden',
});

const statBarFillStyle = css({
  height: '100%',
});

const statValueStyle = css({
  fontSize: 'xs',
  fontWeight: 'semibold',
  width: '2rem',
  textAlign: 'right',
});
