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
  borderRadius: '16px',
  backgroundColor: 'gray.gray_150',
  padding: '60px 40px',

  maxWidth: 'calc(100% - 400px)',
  maxHeight: 'calc(100% - 240px)',
  width: '100%',
  height: '100%',

  '@media (max-width: 1200px)': {
    maxWidth: 'calc(100vw - 240px)',
    maxHeight: 'calc(100vh - 120px)',
  },
  _mobile: {
    maxWidth: '100vw',
    maxHeight: '100vh',
  },
});
