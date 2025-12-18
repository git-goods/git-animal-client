'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { AnimatePresence, motion } from 'framer-motion';

type Ranking = {
  score: number;
  time: number;
  moves: number;
  date: string;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getRankEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
    case 2:
      return 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)';
    case 3:
      return 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)';
    default:
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
};

export default function RankingPage() {
  const router = useRouter();
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  useEffect(() => {
    const storedRankings = JSON.parse(localStorage.getItem('memoryGameRankings') || '[]');
    setRankings(storedRankings);
  }, []);

  const clearRankings = () => {
    if (confirm('Are you sure you want to clear all rankings?')) {
      localStorage.removeItem('memoryGameRankings');
      setRankings([]);
    }
  };

  return (
    <div
      className={css({
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      })}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={css({
          maxWidth: '900px',
          margin: '0 auto',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          })}
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={css({
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            })}
          >
            🏆 Hall of Fame
          </motion.h1>

          <div className={css({ display: 'flex', gap: '1rem' })}>
            <Button
              onClick={() => router.push('/game/mini/memory')}
              className={css({
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              })}
            >
              Back to Game
            </Button>

            {rankings.length > 0 && (
              <Button
                onClick={clearRankings}
                className={css({
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                })}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {rankings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={css({
              textAlign: 'center',
              padding: '4rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '1rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            })}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className={css({
                fontSize: '4rem',
                marginBottom: '1rem',
              })}
            >
              🎮
            </motion.div>
            <h2
              className={css({
                fontSize: '1.5rem',
                color: '#666',
                marginBottom: '1rem',
              })}
            >
              No rankings yet!
            </h2>
            <p
              className={css({
                fontSize: '1rem',
                color: '#888',
              })}
            >
              Play the memory game to set your first record!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={css({
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            })}
          >
            <AnimatePresence>
              {rankings.map((ranking, index) => (
                <motion.div
                  key={`${ranking.date}-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedRank(selectedRank === index ? null : index)}
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.25rem',
                    marginBottom: index === rankings.length - 1 ? 0 : '1rem',
                    background:
                      selectedRank === index
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                        : 'white',
                    borderRadius: '0.75rem',
                    border: index < 3 ? '2px solid' : '1px solid #e0e0e0',
                    borderColor:
                      index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedRank === index ? 'scale(1.02)' : 'scale(1)',
                    boxShadow:
                      selectedRank === index ? '0 8px 20px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                  })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: index < 3 ? [0, -5, 5, -5, 0] : 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={css({
                      fontSize: index < 3 ? '2.5rem' : '1.5rem',
                      fontWeight: 'bold',
                      width: '80px',
                      textAlign: 'center',
                      background: index < 3 ? getRankColor(index + 1) : 'none',
                      backgroundClip: index < 3 ? 'text' : 'unset',
                      color: index < 3 ? 'transparent' : '#666',
                    })}
                    style={{
                      WebkitBackgroundClip: index < 3 ? 'text' : 'unset',
                    }}
                  >
                    {getRankEmoji(index + 1)}
                  </motion.div>

                  <div
                    className={css({
                      flex: 1,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '1rem',
                      alignItems: 'center',
                    })}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                      className={css({ textAlign: 'center' })}
                    >
                      <div
                        className={css({
                          fontSize: '0.75rem',
                          color: '#888',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        })}
                      >
                        Score
                      </div>
                      <div
                        className={css({
                          fontSize: index < 3 ? '1.75rem' : '1.5rem',
                          fontWeight: 'bold',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          backgroundClip: 'text',
                          color: 'transparent',
                        })}
                        style={{
                          WebkitBackgroundClip: 'text',
                        }}
                      >
                        {ranking.score}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                      className={css({ textAlign: 'center' })}
                    >
                      <div
                        className={css({
                          fontSize: '0.75rem',
                          color: '#888',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        })}
                      >
                        Time
                      </div>
                      <div
                        className={css({
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#333',
                        })}
                      >
                        {formatTime(ranking.time)}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                      className={css({ textAlign: 'center' })}
                    >
                      <div
                        className={css({
                          fontSize: '0.75rem',
                          color: '#888',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        })}
                      >
                        Moves
                      </div>
                      <div
                        className={css({
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#333',
                        })}
                      >
                        {ranking.moves}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={css({ textAlign: 'center' })}
                    >
                      <div
                        className={css({
                          fontSize: '0.75rem',
                          color: '#888',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        })}
                      >
                        Date
                      </div>
                      <div
                        className={css({
                          fontSize: '0.875rem',
                          color: '#666',
                        })}
                      >
                        {formatDate(ranking.date)}
                      </div>
                    </motion.div>
                  </div>

                  {index < 3 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className={css({
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        width: '40px',
                        height: '40px',
                        background: getRankColor(index + 1),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                      })}
                    >
                      ⭐
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={css({
                marginTop: '2rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
                borderRadius: '0.5rem',
                textAlign: 'center',
              })}
            >
              <p
                className={css({
                  fontSize: '0.875rem',
                  color: '#666',
                })}
              >
                Top 10 scores are saved locally. Beat your best time!
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
