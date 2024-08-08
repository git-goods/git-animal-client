/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { useGetAllPets } from '@/apis/user/useGetAllPets';
import Button from '@/components/Button';
import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';
import { useLoading } from '@/store/loading';
import { useUser } from '@/store/user';
import { copyClipBoard } from '@/utils/copy';

import { FarmSection } from './index.styles';

const size = 120;
function FarmType() {
  const queryClient = useQueryClient();

  const { username } = useUser();
  const { showSnackBar } = useSnackBar();
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

      showSnackBar({ message: '복사 성공!' });
    } catch (error) { }
  };

  useEffect(() => {
    setAnimals(setInitData());
  }, [data, setInitData]);

  return (
    <>
      <ChangePet>
        <h2>Change pet</h2>
        <AnimalList>
          {animals.map((animal) => {
            return (
              <Item
                key={animal.key}
                size={size}
                style={{
                  filter: animal.isSelected ? 'brightness(0.5)' : 'brightness(1)',
                }}
                onClick={() => onClick(animal)}
              >
                <img className="animal" src={animal.image} alt="animal" width={size} height={size} />
              </Item>
            );
          })}
        </AnimalList>
      </ChangePet>

      <Preview>
        <GitanimalsFarm imageKey={`${selectedAnimals.length}`} sizes={[600, 300]} />
      </Preview>

      <ButtonWrapper>
        <Button onClick={onLinkCopy}>Copy Link</Button>
      </ButtonWrapper>
    </>
  );
}

export default FarmType;
const ButtonWrapper = styled.div`
  margin: 72px auto;
  width: fit-content;
`;

const ChangePet = styled(FarmSection)`
  .pet-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .check-icon {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    filter: brightness(1);
  }
  button {
    position: relative;
    &.selected .pet-image {
      filter: brightness(0.5);
    }
  }
`;

const Preview = styled(FarmSection)`
  width: fit-content;
  margin: 44px auto 0;
  padding: 0;
`;

const Item = styled.button<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;

  .animal {
    position: absolute;
    left: 0;
    height: 100%;
    object-fit: contain;
  }
`;

const AnimalList = styled.ul`
  display: flex;
  max-width: 100%;
  width: 1000px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2b2b2b8b;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  button {
    position: relative;
    z-index: 1;
  }
`;

const SelectedImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
function showSnackBar(arg0: { message: string }) {
  throw new Error('Function not implemented.');
}
