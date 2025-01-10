'use client';

/* eslint-disable @next/next/no-img-element */
import { useFormStatus } from 'react-dom';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import type { Guild } from '@gitanimals/api';
import { Button, TextArea, TextField } from '@gitanimals/ui-panda';

import { getBackgroundImage } from '@/utils/image';

import { SelectableFormItem, SelectableFormItemOption } from './SelecableFormItem';

export interface FormState {
  message: string;
}

interface GuildInfoFormProps {
  icons: string[];
  backgrounds: string[];
  initialData?: Guild;
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
          defaultValue={props.initialData?.title}
        />
        <TextArea placeholder="Type guild description" name="description" defaultValue={props.initialData?.body} />
      </div>
      <div>
        <p className={headingStyle}>Guild thumbnail</p>
        <SelectableFormItem name="icon" defaultValue={props.initialData?.guildIcon}>
          <Flex gap="6px">
            {props.icons.map((icon) => (
              <SelectableFormItemOption value={icon} key={icon}>
                {({ isSelected }) => (
                  <img
                    src={icon}
                    className={cx(
                      itemStyle,
                      isSelected && css({ border: '1.5px solid', borderColor: 'white.white_90' }),
                    )}
                    width={70}
                    height={70}
                    alt={icon}
                  />
                )}
              </SelectableFormItemOption>
            ))}
          </Flex>
        </SelectableFormItem>
      </div>
      <div>
        <p className={headingStyle}>Guild background</p>
        <SelectableFormItem name="background" defaultValue={props.initialData?.farmType}>
          <Flex gap="6px">
            {props.backgrounds?.map((background) => (
              <SelectableFormItemOption value={background} key={background}>
                {({ isSelected }) => (
                  <img
                    src={getBackgroundImage(background)}
                    className={cx(
                      itemStyle,
                      isSelected &&
                        css({
                          border: '1.5px solid',
                          borderColor: 'white.white_90',
                        }),
                    )}
                    width={284}
                    height={124}
                    key={background}
                    alt={background}
                  />
                )}
              </SelectableFormItemOption>
            ))}
          </Flex>
        </SelectableFormItem>
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

export function GuildInfoFormSubmitButton({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={css({ display: 'block', mt: 10, mx: 'auto' })} disabled={disabled || pending}>
      {children}
    </Button>
  );
}
