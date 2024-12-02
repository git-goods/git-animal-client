'use client';

import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';

import FeedBack from './FeedbackForm';

function GlobalComponent() {
  return createPortal(
    <>
      <FeedBack />
      <Toaster
        position="top-center"
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
    </>,
    document.body,
  );
}

export default GlobalComponent;
