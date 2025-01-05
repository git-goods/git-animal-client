/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { getGuildBackgrounds, getGuildIcons } from '@gitanimals/api';
import { TextArea, TextField } from '@gitanimals/ui-panda';

import { getBackgroundImage } from '@/utils/image';

export default async function GuildCreate() {
  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();

  return (
    <Flex flexDirection="column" gap="24px">
      <div>
        <p className={headingStyle}>Guild info</p>
        <TextField placeholder="Type guild name" className={css({ mb: '6px' })} />
        <TextArea placeholder="Type guild description" />
      </div>
      <div>
        <p className={headingStyle}>Guild thumbnail</p>
        <Flex gap="6px">
          {icons.icons.map((icon) => (
            <img src={icon} className={itemStyle} width={70} height={70} key={icon} alt={icon} />
          ))}
        </Flex>
      </div>
      <div>
        <p className={headingStyle}>Guild background</p>
        <Flex gap="6px">
          {backgrounds.backgrounds.map((background) => (
            <img
              src={getBackgroundImage(background)}
              className={itemStyle}
              width={284}
              height={124}
              key={background}
              alt={background}
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
  borderRadius: '8px',
});

const itemSelectedStyle = css({
  border: '1.5px solid',
  borderColor: 'white.white_90',
});
