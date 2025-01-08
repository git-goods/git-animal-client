/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { getGuildBackgrounds, getGuildIcons } from '@gitanimals/api';
import { TextArea, TextField } from '@gitanimals/ui-panda';

import { getBackgroundImage } from '@/utils/image';

import { SelecableFormItem, SelecableFormItemOption } from './SelecableFormItem';

export interface GuildInfoFormProps {}

export async function GuildInfoForm(props: GuildInfoFormProps) {
  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();

  return (
    <Flex flexDirection="column" gap="24px">
      <div>
        <p className={headingStyle}>Guild info</p>
        <TextField name="name" placeholder="Type guild name" className={css({ mb: '6px' })} />
        <TextArea placeholder="Type guild description" name="description" />
      </div>
      <div>
        <p className={headingStyle}>Guild thumbnail</p>
        <SelecableFormItem name="icon">
          <Flex gap="6px">
            {icons.map((icon) => (
              <SelecableFormItemOption value={icon} key={icon}>
                <img src={icon} className={itemStyle} width={70} height={70} alt={icon} />
              </SelecableFormItemOption>
            ))}
          </Flex>
        </SelecableFormItem>
      </div>
      <div>
        <p className={headingStyle}>Guild background</p>
        <SelecableFormItem name="background">
          <Flex gap="6px">
            {backgrounds?.map((background) => (
              <SelecableFormItemOption value={background} key={background}>
                <img
                  src={getBackgroundImage(background)}
                  className={itemStyle}
                  width={284}
                  height={124}
                  key={background}
                  alt={background}
                />
              </SelecableFormItemOption>
            ))}
          </Flex>
        </SelecableFormItem>
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
  _groupActive: {
    border: '1.5px solid',
    borderColor: 'white.white_90',
  },
});
