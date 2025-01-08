/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, TextField } from '@gitanimals/ui-panda';

import { createGuildAction } from '@/serverActions/guild';

export interface GuildInfoFormProps {}

export function GuildInfoForm() {
  //   const { data: icons } = useQuery(guildQueries.getGuildIconsOptions());
  //   const { data: backgrounds } = useQuery(guildQueries.getGuildBackgroundsOptions());

  const icons = ['icon1', 'icon2', 'icon3'];

  return (
    <form action={createGuildAction}>
      <Flex flexDirection="column" gap="24px">
        <div>
          <p className={headingStyle}>Guild info</p>
          <TextField
            name="name"
            placeholder="Type guild name"
            className={css({ mb: '6px' })}
            // onChange={(e) => onDataChange('title', e.target.value)}
          />
          {/* <TextArea placeholder="Type guild description" onChange={(e) => onDataChange('body', e.target.value)} /> */}
        </div>
        <div>
          <p className={headingStyle}>Guild thumbnail</p>
          <Flex gap="6px">
            {icons?.map((icon) => (
              //   <button onClick={() => onDataChange('icon', icon)} key={icon}>
              <img
                src={icon}
                className={itemStyle}
                width={70}
                height={70}
                key={icon}
                alt={icon}
                // style={{
                //   border: formData.icon === icon ? '1.5px solid' : 'none',
                // }}
              />
              //   </button>
            ))}
          </Flex>
        </div>
        {/* <div>
          <p className={headingStyle}>Guild background</p>
          <Flex gap="6px">
            {backgrounds?.map((background) => (
              <button onClick={() => onDataChange('background', background)} key={background}>
                <img
                  src={getBackgroundImage(background)}
                  className={itemStyle}
                  width={284}
                  height={124}
                  key={background}
                  alt={background}
                  style={{
                    border: formData.background === background ? '1.5px solid' : 'none',
                  }}
                />
              </button>
            ))}
          </Flex>
        </div> */}
        <Button type="submit">Create Guild</Button>
      </Flex>
    </form>
  );
}

const headingStyle = css({
  textStyle: 'glyph14.bold',
  mb: 2,
});

const itemStyle = css({
  borderColor: 'white.white_90',
  borderRadius: '8px',
});
