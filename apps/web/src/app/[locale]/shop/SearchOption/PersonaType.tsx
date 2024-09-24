/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css, cx } from '_panda/css';
import { center, flex } from '_panda/patterns';
import { CloseIcon, SearchIcon } from '@gitanimals/ui-icon';

import { useGetPersonaTypes } from '@/apis/auctions/useGetPersonaTypes';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Modal from '@/components/Modal/Modal';
import { getPersonaImage } from '@/utils/image';

interface SearchProps {
  onSelect: (personaType?: string) => void;
  selected?: string;
}

function PersonaType(props: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetPersonaTypes({
    enabled: isOpen,
  });

  const onClick = (personaType?: string) => {
    props.onSelect(personaType);
    setIsOpen(false);
  };

  return (
    <>
      <button className={buttonWrapperStyle} onClick={() => setIsOpen(true)}>
        <SearchIcon color="rgba(255, 255, 255, 0.5)" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DottedThreeBox width={800} height={700} bgColor="#fff">
          <div className={searchPopupStyle}>
            <h2 className={headingStyle}>Select Find Persona</h2>
            {props.selected && (
              <div className={selectPersonaStyle}>
                Selected Persona : {props.selected}
                <button onClick={() => onClick()}>
                  <CloseIcon color="#878787" />
                </button>
              </div>
            )}

            <div className={searchPopupInnerStyle}>
              {data?.productTypes.map((type) => (
                <div className={personaItemStyle} key={type.name} onClick={() => onClick(type.name)}>
                  <div className={cx('persona-item-img', personaItemImgStyle)}>
                    <img src={getPersonaImage(type.name)} alt={type.name} width={70} height={70} />
                  </div>
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </DottedThreeBox>
      </Modal>
    </>
  );
}

export default PersonaType;

const buttonWrapperStyle = center({
  w: 36,
  h: 36,
  backgroundColor: 'white.white_25',
  borderRadius: 10,
});

const headingStyle = css({
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '24px',
  margin: '24px 0',
});

const searchPopupStyle = flex({
  flexDirection: 'column',
  width: '800px',
  height: '700px',
  padding: '8px',
});

const selectPersonaStyle = css({
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '& button': {
    height: '24px',
  },
});

const searchPopupInnerStyle = css({
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '24px',
  justifyContent: 'space-between',
  textAlign: 'center',
  gap: '24px 8px',
});

const personaItemImgStyle = css({
  minHeight: '76px',
});

const personaItemStyle = css({
  cursor: 'pointer',
  '&:hover': {
    '& .persona-item-img': {
      animation: 'jump 0.5s infinite',
    },
  },
});

// function CloseIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#878787">
//       <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
//     </svg>
//   );
// }
