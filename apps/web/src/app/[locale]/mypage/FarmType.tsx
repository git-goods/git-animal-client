'use client';

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { useGetAllPets } from '@/apis/user/useGetAllPets';
import Button from '@/components/Button';
import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';
import { useLoading } from '@/store/loading';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

const size = 120;

function FarmType() {
  const queryClient = useQueryClient();

  const { name: username } = useClientUser();
  const { setLoading } = useLoading();

  const { data } = useGetAllPets(username, {
    enabled: Boolean(username),
  });

  const setInitData = useCallback(() => {
    const personaList = data?.personas || [];

    const initList = personaList.map((persona) => ({
      key: persona.type,
      image: `${STATIC_IMAGE_URL}/${persona.type}`,
      isSelected: persona.visible,
      ...persona,
    }));

    return initList;
  }, [data]);

  const [animals, setAnimals] = useState(setInitData());
  const selectedAnimals = animals.filter((animal) => animal.isSelected);

  const { mutate } = useChangePersonaVisible({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (res) => {
      setAnimals((prev) =>
        prev.map((animal) => {
          if (animal.id === res.id) {
            return {
              ...animal,
              isSelected: res.visible,
            };
          }
          return animal;
        }),
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'all-pet'],
      });
      setLoading(false);
    },
  });

  const onClick = (persona: PetInfoSchema) => {
    mutate({
      personaId: persona.id,
      visible: !persona.visible,
    });
  };

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(getGitanimalsFarmString({ username }));

      toast.success('복사 성공!', {
        position: 'top-center',
        duration: 3000,
      });
    } catch (error) {}
  };

  useEffect(() => {
    setAnimals(setInitData());
  }, [data, setInitData]);

  return (
    <>
      <section className={cx(farmSectionStyle, changePetStyle)}>
        <h2>Change pet</h2>
        <ul className={animalListStyle}>
          {animals.map((animal) => {
            return (
              <button
                className={itemStyle}
                key={animal.key}
                // size={size}
                style={{
                  filter: animal.isSelected ? 'brightness(0.5)' : 'brightness(1)',
                  width: `${size}px`,
                  height: `${size}px`,
                  minWidth: `${size}px`,
                }}
                onClick={() => onClick(animal)}
              >
                <img className="animal" src={animal.image} alt="animal" width={size} height={size} />
              </button>
            );
          })}
        </ul>
      </section>

      <section className={cx(farmSectionStyle, previewStyle)}>
        <GitanimalsFarm imageKey={`${selectedAnimals.length}`} sizes={[600, 300]} />
      </section>

      <div className={buttonWrapperStyle}>
        <Button onClick={onLinkCopy}>Copy Link</Button>
      </div>
    </>
  );
}

export default FarmType;

const buttonWrapperStyle = css({
  margin: '72px auto',
  width: 'fit-content',
});

const farmSectionStyle = css({
  marginTop: '42px',
  paddingLeft: '16px',

  '& > h2': {
    color: '#fff',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    marginBottom: '30px',
    lineHeight: 'normal',
  },
});

const changePetStyle = css({
  '& .pet-list': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },

  '& .check-icon': {
    position: 'absolute',
    top: '30px',
    left: 0,
    right: 0,
    margin: '0 auto',
    filter: 'brightness(1)',
  },

  '& button': {
    position: 'relative',
    '&.selected .pet-image': {
      filter: 'brightness(0.5)',
    },
  },
});

const previewStyle = css({
  width: 'fit-content',
  margin: '44px auto 0',
  padding: 0,
});

const itemStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .animal': {
    position: 'absolute',
    left: 0,
    height: '100%',
    objectFit: 'contain',
  },
});

const animalListStyle = css({
  display: 'flex',
  maxWidth: '100%',
  width: '1000px',
  overflowX: 'auto',

  '&::-webkit-scrollbar': {
    width: '2px',
    height: '10px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#2b2b2b8b',
    borderRadius: '10px',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
  },

  '& button': {
    position: 'relative',
    zIndex: 1,
  },
});
