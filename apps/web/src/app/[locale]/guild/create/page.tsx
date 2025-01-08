import { useFormStatus } from 'react-dom';
import { css } from '_panda/css';
import { Button, dialogTitleStyle } from '@gitanimals/ui-panda';

// import { createGuildAction } from '@/serverActions/guild';
import { GuildInfoForm } from '../(components)/GuidlInfoForm';

export default function GuildCreatePage() {
  const createGuildAction = async (formData: FormData) => {
    // const res = await createGuild({
    //   title: formData.get('title') as string,
    //   body: formData.get('body') as string,
    // });
    console.log('formData: ', formData);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('form end');
  };

  return (
    <div className={css({ minH: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
      <div
        className={css({
          maxWidth: '880px',
          mx: 'auto',
          background: 'gray.gray_150',
          p: '40px',
          borderRadius: '16px',
          color: 'white.white',
        })}
      >
        <h2 className={dialogTitleStyle}>Create Guild</h2>
        <form action={createGuildAction}>
          <GuildCreateForm />
        </form>
      </div>
    </div>
  );
}

function GuildCreateForm() {
  const { pending } = useFormStatus();

  return (
    <>
      <GuildInfoForm />
      <Button type="submit" mt="40px" mx="auto" disabled={pending}>
        Create Guild
      </Button>
    </>
  );
}
