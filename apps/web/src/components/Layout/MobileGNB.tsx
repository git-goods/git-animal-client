'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { GithubIcon } from '@gitanimals/ui-icon';
import type { Transition, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Globe, LogInIcon, LogOutIcon, Menu, ShoppingCart } from 'lucide-react';

import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { Link } from '@/i18n/routing';
import { useClientSession } from '@/utils/clientAuth';

const MobileGNB = () => {
  const session = useClientSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className={cx(headerBaseStyle, mobileHeaderStyle)}>
        <div className={mobileHeaderContentStyle}>
          <button onClick={toggleMenu}>
            <Menu size={24} color="black" />
          </button>

          <div className={mobileLogoStyle}>
            <Image src="/main/gnb_right_logo.svg" alt="gitanimals-logo" width={80} height={22} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariant}
            transition={menuTransition}
            className={mobileMenuStyle}
          >
            <ul className={mobileMenuListStyle}>
              <Link href="/shop">
                <MenuItem icon={<ShoppingCart size={20} color="#9295A1" />} label="Auction" />
              </Link>
              <a href={GIT_ANIMALS_MAIN_URL} target="_blank">
                <MenuItem icon={<GithubIcon width={22} height={22} color="#6e717a" />} label="Github" />
              </a>
              <button>
                <MenuItem icon={<Globe size={20} color="#9295A1" />} label="Language" />
              </button>
              <button>
                {session ? (
                  <MenuItem icon={<LogOutIcon size={20} color="#9295A1" />} label="Logout" />
                ) : (
                  <MenuItem icon={<LogInIcon size={20} color="#9295A1" />} label="Login" />
                )}
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileGNB;
function MenuItem({ icon, label, isArrow = true }: { icon: React.ReactNode; label: string; isArrow?: boolean }) {
  return (
    <motion.li className={menuItemStyle}>
      <div>
        {icon}
        <p>{label}</p>
      </div>
      {isArrow && <ChevronRight size={20} color="#9295A1" />}
    </motion.li>
  );
}

const headerBaseStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 100,
  position: 'fixed',
  padding: '0 20px',
  top: 0,
  height: 60,
  width: '100%',
  backgroundColor: 'white',
});

const mobileHeaderStyle = css({
  width: '100vw',

  display: 'none',
  _mobile: {
    display: 'flex',
  },
});

const mobileHeaderContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: 'calc(100vw - 40px)',
});

const mobileLogoStyle = css({
  width: '80px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

const mobileMenuStyle = css({
  position: 'fixed',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  top: '60px',
  maxHeight: 'calc(100vh - 60px)',
  overflowY: 'auto',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  zIndex: 99,
});

const mobileMenuListStyle = css({
  '& >  *': {
    width: '100%',
  },
});

const menuItemStyle = flex({
  justifyContent: 'space-between',
  textStyle: 'glyph16.regular',
  textTransform: 'capitalize',
  color: 'black.black_75',
  padding: '18px 22px 18px 20px',
  borderBottom: '1px solid',
  borderColor: 'gray.gray_900',

  '& div': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
});

const menuVariant: Variants = {
  initial: { opacity: 1, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: '-100%' },
};

const menuTransition: Transition = { duration: 0.3, ease: 'easeInOut' };
