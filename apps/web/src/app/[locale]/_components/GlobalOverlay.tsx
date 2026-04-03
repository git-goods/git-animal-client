'use client';

import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';

import FeedbackForm from '@/features/feedback/ui/FeedbackForm';
import { DialogComponent } from '@/shared/hooks/useDialog';

function GlobalOverlay() {
  return createPortal(
    <>
      <FeedbackForm />
      <DialogComponent />
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

export default GlobalOverlay;
