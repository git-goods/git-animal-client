'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import { GitanimalsLine } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';

import { SelectPersonaList } from './PersonaList';

interface Props {}

function OneType({}: Props) {
  const { name } = useClientUser();
  const [selectPersona, setSelectPersona] = useState<string | null>();

  // const [selected, setSelected] = useState<PetInfoSchema>();
  const [sizes, setSizes] = useState<[number, number]>([600, 120]);
  // const [error, setError] = useState('');

  // const { name: username } = useClientUser();

  // const { data } = useGetUniqueTypeAllPets(username, {
  //   enabled: Boolean(username),
  // });

  // const personaList = data?.personas || [];

  // const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value);
  //   setError('');

  //   if (value > 1000) {
  //     setError('1000 이상은 설정할 수 없습니다.');
  //   }

  //   setSizes([value, sizes[1]]);
  // };

  // const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setError('');
  //   setSizes([sizes[0], parseInt(e.target.value)]);
  // };

  // const onLinkCopy = async () => {
  //   try {
  //     await copyClipBoard(getGitanimalsLineString({ username, petId: selected?.id, sizes }));

  //     toast.success('복사 성공!', {
  //       position: 'top-center',
  //       duration: 2000,
  //     });
  //   } catch (error) {}
  // };

  return (
    <>
      {name && (
        <SelectPersonaList
          name={name}
          selectPersona={selectPersona ? [selectPersona] : []}
          onSelectPersona={(persona) => setSelectPersona(persona)}
        />
      )}

      <div
        className={lineContainerStyle}
        style={{
          width: sizes[0],
          height: sizes[1],
        }}
      >
        <GitanimalsLine sizes={sizes} petId={selectPersona ? selectPersona : undefined} />
      </div>

      {/* <section className={farmSectionStyle}>
        <h2>choose only one pet</h2>
        <SelectAnimal selected={selected} setSelected={setSelected} size={120} personaList={personaList} />
      </section>
      <section className={farmSectionStyle}>
        <h2>영역을 customize 하세요</h2>
        <div className={inputWrapperStyle}>
          <label htmlFor="width">width</label>
          <input type="number" name="width" id="width" value={sizes[0]} onChange={(e) => onWidthChange(e)} />

          <label htmlFor="height">height</label>
          <input type="number" name="height" id="height" value={sizes[1]} onChange={(e) => onHeightChange(e)} />
        </div>
        {error && <p className={errorMsgStyle}>{error}</p>}
      
      </section>
      <div className={buttonWrapperStyle}>
        <Button onClick={onLinkCopy}>Copy Link</Button>
      </div> */}
    </>
  );
}

export default OneType;

// const farmSectionStyle = css({
//   marginTop: '42px',
//   paddingLeft: '16px',

//   '& > h2': {
//     color: '#fff',
//     fontSize: '16px',
//     fontStyle: 'normal',
//     fontWeight: 400,
//     marginBottom: '30px',
//     lineHeight: 'normal',
//   },
// });
// const buttonWrapperStyle = css({
//   margin: '72px auto',
//   width: 'fit-content',
// });

// const inputWrapperStyle = css({
//   color: 'white',
//   display: 'flex',
//   marginBottom: '24px',
//   alignItems: 'center',
//   gap: '12px',

//   '& input': {
//     width: '100px',
//     height: '30px',
//     borderRadius: '4px',
//     border: '1px solid #141414',
//     padding: '0 8px',
//     outline: '1px solid #141414',
//   },

//   '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
//     WebkitAppearance: 'none',
//   },
// });

const lineContainerStyle = css({
  width: '100%',
  background: 'white',
  height: '100%',
  transition: 'all 0.3s',
  maxWidth: '1000px',

  margin: '24px auto',

  '& img': {
    maxWidth: '100%',
  },
});

// const errorMsgStyle = css({
//   color: 'white',
//   marginBottom: '12px',
//   fontSize: '14px',
// });
