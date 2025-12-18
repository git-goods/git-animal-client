'use client';

import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { motion } from 'framer-motion';

interface ChristmasGameCompletedProps {
  moves: number;
  onPlayAgain: () => void;
}

export default function ChristmasGameCompleted({ moves, onPlayAgain }: ChristmasGameCompletedProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={css({
        position: 'relative',
        textAlign: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 220, 0.95) 100%)',
        border: '3px solid #FFD700',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(26, 15, 10, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        margin: 'auto',
        maxWidth: '320px',
      })}
    >
      {/* Background Christmas Elements */}
      <div
        className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'radial-gradient(circle at 30% 30%, #FFD700 2px, transparent 2px), radial-gradient(circle at 70% 70%, #C41E3A 1px, transparent 1px)',
          backgroundSize: '40px 40px, 60px 60px',
          zIndex: 0,
        })}
      />

      {/* Floating Christmas Icons */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={css({
          position: 'absolute',
          top: '10px',
          left: '20px',
          fontSize: '24px',
          zIndex: 1,
        })}
      >
        🎅
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className={css({
          position: 'absolute',
          top: '15px',
          right: '20px',
          fontSize: '20px',
          zIndex: 1,
        })}
      >
        🎁
      </motion.div>

      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className={css({
          position: 'absolute',
          bottom: '15px',
          left: '25px',
          fontSize: '18px',
          zIndex: 1,
        })}
      >
        🎄
      </motion.div>

      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className={css({
          position: 'absolute',
          bottom: '20px',
          right: '25px',
          fontSize: '16px',
          zIndex: 1,
        })}
      >
        ⭐
      </motion.div>

      {/* Main Content */}
      <div className={css({ position: 'relative', zIndex: 2 })}>
        {/* Success Icon with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className={css({
            fontSize: '48px',
            marginBottom: '16px',
          })}
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            🏆
          </motion.span>
        </motion.div>

        {/* Congratulations Text */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={css({
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 50%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(139, 0, 0, 0.3)',
            fontFamily: 'monospace',
          })}
        >
          Merry Christmas! 🎄
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={css({
            fontSize: '14px',
            color: '#8B4513',
            marginBottom: '16px',
            fontWeight: '600',
            letterSpacing: '0.5px',
          })}
        >
          ✨ Victory Achieved! ✨
        </motion.div>

        {/* Moves Counter with Christmas Styling */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.8,
          }}
          className={css({
            background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '20px',
            border: '2px solid #FFD700',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '20px',
            fontFamily: 'monospace',
            textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
            boxShadow: '0 4px 12px rgba(196, 30, 58, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          })}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            🎯 {moves} Moves! 🎯
          </motion.span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className={css({
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          })}
        >
          <Button
            onClick={onPlayAgain}
            className={css({
              minHeight: '44px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #228B22 0%, #006400 100%)',
              color: '#FFFFFF',
              border: '2px solid #FFD700',
              borderRadius: '10px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
              boxShadow: '0 4px 8px rgba(34, 139, 34, 0.4)',
              transition: 'all 0.2s ease',
              '&:hover': {
                brightness: '1.1',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(34, 139, 34, 0.5)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            })}
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔄 Play Again
            </motion.span>
          </Button>

          <Button
            onClick={() => router.push('/game/mini/memory')}
            className={css({
              minHeight: '44px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              color: '#FFFFFF',
              border: '2px solid #FFD700',
              borderRadius: '10px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
              boxShadow: '0 4px 8px rgba(139, 69, 19, 0.4)',
              transition: 'all 0.2s ease',
              '&:hover': {
                brightness: '1.1',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(139, 69, 19, 0.5)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            })}
          >
            🔙 Animals
          </Button>
        </motion.div>

        {/* Christmas Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={css({
            marginTop: '16px',
            fontSize: '11px',
            color: '#8B4513',
            fontStyle: 'italic',
            opacity: 0.8,
          })}
        >
          🎅 Ho ho ho! Well done! 🎅
        </motion.div>
      </div>

      {/* Falling Snow Effect */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, window.innerHeight || 800],
            x: [0, 20, -10, 15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'linear',
          }}
          className={css({
            position: 'absolute',
            color: '#FFFFFF',
            fontSize: '10px',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 3,
          })}
          style={{
            left: `${10 + i * 12}%`,
            top: `-20px`,
          }}
        >
          ❄️
        </motion.div>
      ))}
    </motion.div>
  );
}