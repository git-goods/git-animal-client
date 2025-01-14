'use client';

/* eslint-disable @next/next/no-img-element */
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import type { Guild } from '@gitanimals/api';
import { TextArea, TextField } from '@gitanimals/ui-panda';

import { getBackgroundImage } from '@/utils/image';

export interface FormState {
  message: string;
}

interface GuildInfoFormProps {
  icons: string[];
  backgrounds: string[];
  initialData?: Guild;
  onFieldChange: (key: string, value: string) => void;
  fields: {
    title: string;
    body: string;
    guildIcon: string;
    farmType: string;
    autoJoin: boolean;
  };
}

export function GuildInfoFormClient(props: GuildInfoFormProps) {
  return (
    <Flex flexDirection="column" gap="24px">
      <div>
        <p className={headingStyle}>Guild info</p>
        <TextField
          name="name"
          placeholder="Type guild name"
          className={css({ mb: '6px' })}
          value={props.fields.title}
          onChange={(e) => props.onFieldChange('title', e.target.value)}
        />
        <TextArea
          placeholder="Type guild description"
          name="description"
          value={props.fields.body}
          onChange={(e) => props.onFieldChange('body', e.target.value)}
        />
      </div>
      <div>
        <p className={headingStyle}>Guild thumbnail</p>
        <Flex gap="6px">
          {props.icons.map((icon) => (
            <SelectImgButton
              key={icon}
              img={icon}
              onClick={() => props.onFieldChange('guildIcon', icon)}
              isSelected={props.fields.guildIcon === icon}
              width={70}
              height={70}
            />
          ))}
        </Flex>
      </div>
      <div>
        <p className={headingStyle}>Guild background</p>
        <Flex gap="6px">
          {props.backgrounds?.map((background) => (
            <SelectImgButton
              key={background}
              img={getBackgroundImage(background)}
              onClick={() => props.onFieldChange('farmType', background)}
              isSelected={props.fields.farmType === background}
              width={284}
              height={124}
            />
          ))}
        </Flex>
      </div>
    </Flex>
  );
}

const headingStyle = css({
  textStyle: 'glyph14.bold',
  mb: 2,
});

const itemStyle = css({
  borderColor: 'white.white_90',
  borderRadius: '8px',
  border: 'none',
});

function SelectImgButton(props: {
  img: string;
  onClick: () => void;
  isSelected: boolean;
  width: number;
  height: number;
}) {
  return (
    <button onClick={() => props.onClick()} key={props.img}>
      <img
        src={props.img}
        className={cx(
          itemStyle,
          props.isSelected && css({ border: '1.5px solid', borderColor: 'white.white_90' }),
          !props.isSelected && css({}),
        )}
        width={props.width}
        height={props.height}
        alt={props.img}
      />
    </button>
  );
}
