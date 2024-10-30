'use client';

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import { SelectPersonaList } from '../PersonaList';
import { userQueries } from '@gitanimals/react-query';

function FarmType() {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');

  const { name } = useClientUser();
  const [selectPersona, setSelectPersona] = useState<string[]>([]);
  const [loadingPersona, setLoadingPersona] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExtend, setIsExtend] = useState(false);

  const { mutate } = useChangePersonaVisible({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (res) => {
      if (res.visible) {
        setSelectPersona((prev) => Array.from(new Set([...prev, res.id])));
      } else {
        setSelectPersona((prev) => prev.filter((id) => id !== res.id));
      }
    },
    onSettled: async (res) => {
      await queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      setLoading(false);
      setLoadingPersona((prev) => prev.filter((id) => id !== res?.id));
    },
  });

  const onSelectPersona = (persona: Persona) => {
    setLoadingPersona((prev) => [...prev, persona.id]);

    const isVisible = selectPersona.includes(persona.id);

    if (isVisible) {
      mutate({ personaId: persona.id, visible: false });
    } else {
      mutate({ personaId: persona.id, visible: true });
    }
  };

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(
        getGitanimalsFarmString({
          username: name,
        }),
      );

      toast.success('복사 성공!', { duration: 2000 });
    } catch (error) {}
  };

  const initSelectPersonas = (list: Persona[]) => {
    const visiblePersonaIds = list.filter((persona) => persona.visible).map((persona) => persona.id);
    setSelectPersona(visiblePersonaIds);
  };

  return (
    <>
      <section className={farmSectionStyle}>
        {name && (
          <section className={selectPetContainerStyle}>
            <h2 className="heading">{t('change-pet')}</h2>
            <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
              {isExtend ? t('shrink-button') : t('extend-button')}
            </Button>
            <div className={selectPersonaListStyle}>
              <SelectPersonaList
                name={name}
                loadingPersona={loadingPersona}
                selectPersona={selectPersona}
                onSelectPersona={onSelectPersona}
                initSelectPersonas={initSelectPersonas}
                isExtend={isExtend}
              />
            </div>
          </section>
        )}

        <div>
          <div className={farmStyle}>
            <GitanimalsFarm imageKey={`${selectPersona.length}/${loading ? 'loading' : ''}`} sizes={[600, 300]} />
          </div>
          <Button onClick={onLinkCopy} mt={16} size="m">
            {t('copy-link-title')}
          </Button>
        </div>
      </section>
    </>
  );
}

export default FarmType;

const selectPersonaListStyle = css({
  maxH: '400px',
  overflowY: 'auto',
  _mobile: {
    maxH: '250px',
  },
});

const farmSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '40px 0',
});

const farmStyle = css({ borderRadius: '12px', overflow: 'hidden', width: 'fit-content' });

const selectPetContainerStyle = css({
  position: 'relative',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
  '& .extend-button': {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
});
