import { Toaster } from 'sonner';

import NoticeToast from '../NoticeToast/NoticeToast';

import FeedBack from './FeedbackForm';

function GlobalComponent() {
  return (
    <>
      <FeedBack />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            top: '48px',
            right: '-12px',
          },
          classNames: {
            title: 'toast-title',
            actionButton: 'toast-action-button',
            toast: 'toast-container',
          },
        }}
      />
      <NoticeToast />
    </>
  );
}

export default GlobalComponent;
