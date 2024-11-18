import { ComponentProps, PropsWithChildren } from 'react';
import { Dialog } from './Dialog';
import { css } from '_panda/css';

export function LargeDialogContent({ children }: PropsWithChildren) {
  return (
    <Dialog.Content className={largeDialogContentStyle}>
      {/* <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile here. Click save when you're done.</Dialog.Description>
      </Dialog.Header> */}
      {children}
      {/* <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer> */}
    </Dialog.Content>
  );
}

export function LargeDialog({ children, ...props }: PropsWithChildren & ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <LargeDialogContent>{children}</LargeDialogContent>
    </Dialog>
  );
}

const largeDialogContentStyle = css({
  margin: 'auto',
  borderRadius: '16px',
  backgroundColor: 'gray.gray_150',
  padding: '24px',

  width: 'calc(100vw - 400px)',
  height: 'calc(100vh - 240px)',

  '@media (max-width: 1200px)': {
    width: 'calc(100vw - 240px)',
    height: 'calc(100vh - 120px)',
  },
  _mobile: {
    width: '100vw',
    height: '100vh',
  },
});
