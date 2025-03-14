'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { AnimatePresence, motion } from 'framer-motion';

// PWA 설치 배너 컴포넌트
export const PWAInstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // PWA 설치 이벤트 감지
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setShowBanner(true);
    });

    // 이미 설치된 경우 감지
    window.addEventListener('appinstalled', () => {
      alert('appinstalled');
      setShowBanner(false);
    });
  }, []);

  const handleInstall = () => {
    setShowModal(true);
  };

  // if (!showBanner) return null;

  return (
    <>
      <div
        className={css({
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          bg: 'white',
          p: '4',
          boxShadow: 'lg',
          alignItems: 'center',
          gap: '8px',
          zIndex: '10',
        })}
      >
        <div className={css({ flex: '1' })}>
          <h3 className={css({ fontWeight: 'bold' })}>앱 설치하기</h3>
          <p className={css({ fontSize: 'sm', color: 'gray.600' })}>더 빠르고 편리한 앱 경험을 즐겨보세요!</p>
        </div>
        <div className={flex({ gap: '2', mt: 2, justifyContent: 'flex-end' })}>
          <button
            onClick={() => setShowBanner(false)}
            className={css({
              px: '3',
              py: '1',
              border: '1px solid',
              borderColor: 'gray.300',
              borderRadius: 'md',
              fontSize: 'sm',
            })}
          >
            나중에
          </button>
          <button
            onClick={handleInstall}
            className={css({
              px: '3',
              py: '1',
              bg: 'blue.500',
              color: 'white',
              borderRadius: 'md',
              fontSize: 'sm',
            })}
          >
            설치하기
          </button>
        </div>
      </div>

      {showModal && <PWAInstallGuideModal onClose={() => setShowModal(false)} />}
    </>
  );
};

// PWA 설치 가이드 모달 컴포넌트
export const PWAInstallGuideModal = ({ onClose }: { onClose: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [browserType, setBrowserType] = useState('unknown');

  useEffect(() => {
    // 브라우저 탐지
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setBrowserType('safari');
    } else if (/android/.test(userAgent)) {
      if (/samsung/.test(userAgent)) {
        setBrowserType('samsung');
      } else if (/kakao/.test(userAgent)) {
        setBrowserType('kakao');
      } else if (/naver/.test(userAgent) || /whale/.test(userAgent)) {
        setBrowserType('whale');
      } else {
        setBrowserType('chrome');
      }
    }
  }, []);

  // 브라우저별 설치 가이드
  const slides = [
    // 인트로 슬라이드
    {
      title: '앱으로 설치하기',
      description: '홈 화면에 설치하여 더 빠르게 접근하고 오프라인에서도 사용해보세요!',
      image: '/images/pwa-intro.png',
      isIntro: true,
    },
    // Safari 가이드
    ...(browserType === 'safari'
      ? [
          {
            title: '1단계',
            description: "화면 하단의 '공유' 아이콘을 탭하세요",
            image: '/images/safari-step1.png',
          },
          {
            title: '2단계',
            description: "스크롤을 내려 '홈 화면에 추가'를 탭하세요",
            image: '/images/safari-step2.png',
          },
          {
            title: '3단계',
            description: "오른쪽 상단의 '추가'를 탭하세요",
            image: '/images/safari-step3.png',
          },
        ]
      : []),
    // Chrome 가이드
    ...(browserType === 'chrome'
      ? [
          {
            title: '1단계',
            description: '상단 오른쪽의 메뉴(점 세 개)를 탭하세요',
            image: '/images/chrome-step1.png',
          },
          {
            title: '2단계',
            description: "'앱 설치'를 탭하세요",
            image: '/images/chrome-step2.png',
          },
          {
            title: '3단계',
            description: "'설치'를 탭하세요",
            image: '/images/chrome-step3.png',
          },
        ]
      : []),
    // 삼성 브라우저 가이드
    ...(browserType === 'samsung'
      ? [
          {
            title: '1단계',
            description: '하단의 메뉴(세 줄) 아이콘을 탭하세요',
            image: '/images/samsung-step1.png',
          },
          {
            title: '2단계',
            description: "'홈 화면에 추가'를 탭하세요",
            image: '/images/samsung-step2.png',
          },
          {
            title: '3단계',
            description: "'추가' 버튼을 탭하세요",
            image: '/images/samsung-step3.png',
          },
        ]
      : []),
    // 카카오 브라우저 가이드
    ...(browserType === 'kakao'
      ? [
          {
            title: '1단계',
            description: '하단의 메뉴(세 점) 아이콘을 탭하세요',
            image: '/images/kakao-step1.png',
          },
          {
            title: '2단계',
            description: "'홈 화면에 추가'를 탭하세요",
            image: '/images/kakao-step2.png',
          },
          {
            title: '3단계',
            description: "'추가'를 탭하세요",
            image: '/images/kakao-step3.png',
          },
        ]
      : []),
    // 웨일 브라우저 가이드
    ...(browserType === 'whale'
      ? [
          {
            title: '1단계',
            description: '주소창 오른쪽의 메뉴(세 점) 아이콘을 탭하세요',
            image: '/images/whale-step1.png',
          },
          {
            title: '2단계',
            description: "'홈 화면에 추가'를 탭하세요",
            image: '/images/whale-step2.png',
          },
          {
            title: '3단계',
            description: "'추가'를 탭하세요",
            image: '/images/whale-step3.png',
          },
        ]
      : []),
    // 알 수 없는 브라우저일 경우 기본 가이드
    ...(browserType === 'unknown'
      ? [
          {
            title: '1단계',
            description: '브라우저의 메뉴 버튼을 탭하세요',
            image: '/images/unknown-step1.png',
          },
          {
            title: '2단계',
            description: "'홈 화면에 추가' 또는 '앱 설치' 옵션을 찾아 탭하세요",
            image: '/images/unknown-step2.png',
          },
          {
            title: '3단계',
            description: "확인 창에서 '추가' 또는 '설치'를 탭하세요",
            image: '/images/unknown-step3.png',
          },
        ]
      : []),
    // 마지막 슬라이드 (장점 설명)
    {
      title: '설치 완료!',
      description: '이제 홈 화면에서 앱처럼 빠르게 접근하고, 오프라인에서도 사용 가능합니다.',
      image: '/images/pwa-final.png',
      isFinal: true,
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if ((currentSlide === 0 && newDirection === -1) || (currentSlide === slides.length - 1 && newDirection === 1)) {
      return;
    }

    setPage([page + newDirection, newDirection]);
    if (newDirection === 1) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <div
      className={css({
        position: 'fixed',
        inset: '0',
        bg: 'blackAlpha.500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '50',
        p: '4',
      })}
    >
      <div
        className={css({
          bg: 'white',
          borderRadius: 'lg',
          width: '100%',
          maxWidth: 'md',
          overflow: 'hidden',
        })}
      >
        {/* 헤더 */}
        <div
          className={flex({
            px: '4',
            py: '3',
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            justify: 'space-between',
            align: 'center',
          })}
        >
          <h3 className={css({ fontWeight: 'bold', fontSize: 'lg' })}>PWA 설치 가이드</h3>
          <button
            onClick={onClose}
            className={css({
              color: 'gray.500',
              _hover: { color: 'gray.700' },
            })}
          >
            ✕
          </button>
        </div>

        {/* 슬라이드 영역 */}
        <div
          className={css({
            position: 'relative',
            overflow: 'hidden',
            height: '400px',
          })}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className={css({
                position: 'absolute',
                inset: '0',
              })}
            >
              <div
                className={css({
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: '4',
                })}
              >
                <div
                  className={css({
                    textAlign: 'center',
                    mb: '4',
                  })}
                >
                  <h4 className={css({ fontSize: 'xl', fontWeight: 'bold' })}>{slides[currentSlide].title}</h4>
                  <p className={css({ color: 'gray.600', mt: '1' })}>{slides[currentSlide].description}</p>
                </div>

                <div
                  className={css({
                    flex: '1',
                    width: '100%',
                    bg: 'gray.100',
                    borderRadius: 'lg',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  })}
                >
                  {/* 이미지 영역 (더미) */}
                  <div
                    className={css({
                      width: '100%',
                      height: '64',
                      bg: 'gray.200',
                      borderRadius: 'md',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <p className={css({ color: 'gray.500' })}>이미지: {slides[currentSlide].image}</p>
                  </div>

                  {/* 이미지 위에 표시될 안내 텍스트 */}
                  <div
                    className={css({
                      position: 'absolute',
                      bottom: '4',
                      left: '0',
                      right: '0',
                      textAlign: 'center',
                      bg: 'blackAlpha.700',
                      color: 'white',
                      p: '2',
                      mx: '4',
                      borderRadius: 'md',
                    })}
                  >
                    {slides[currentSlide].description}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 컨트롤 영역 */}
        <div
          className={flex({
            px: '4',
            py: '3',
            borderTop: '1px solid',
            borderColor: 'gray.200',
            justify: 'space-between',
            align: 'center',
          })}
        >
          {/* 슬라이드 인디케이터 */}
          <div className={flex({ gap: '1' })}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={css({
                  width: '2',
                  height: '2',
                  borderRadius: 'full',
                  bg: currentSlide === index ? 'blue.500' : 'gray.300',
                })}
              ></div>
            ))}
          </div>

          {/* 버튼 영역 */}
          <div className={flex({ gap: '2' })}>
            <button
              onClick={handleSkip}
              className={css({
                px: '3',
                py: '1',
                border: '1px solid',
                borderColor: 'gray.300',
                borderRadius: 'md',
                fontSize: 'sm',
              })}
            >
              건너뛰기
            </button>

            <button
              onClick={nextSlide}
              className={css({
                px: '4',
                py: '1',
                bg: 'blue.500',
                color: 'white',
                borderRadius: 'md',
                fontSize: 'sm',
              })}
            >
              {currentSlide === slides.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PWAGuide() {
  return (
    <div>
      <PWAInstallBanner />
      {/* 페이지 콘텐츠는 여기에 */}
    </div>
  );
}
