import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { TextArea, TextField } from '@gitanimals/ui-panda';

export default function GuildCreate() {
  return (
    <Flex flexDirection="column" gap="24px">
      <div>
        <p className={headingStyle}>Guild info</p>
        <TextField placeholder="Type guild name" className={css({ mb: '6px' })} />
        <TextArea placeholder="Type guild description" />
      </div>
      <div>
        <p className={headingStyle}>Guild thumbnail</p>
      </div>
      <div>
        <p className={headingStyle}>Guild background</p>
      </div>
    </Flex>
  );
}

const headingStyle = css({
  textStyle: 'glyph14.bold',
  mb: 2,
});
