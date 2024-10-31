import { useRef, useEffect } from 'react';

export const useDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(function setOnCloseEventAtDialog() {
    const handleClose = () => {
      onClose?.();
    };
    dialogRef.current?.addEventListener('close', handleClose);

    return () => {
      dialogRef.current?.removeEventListener('close', handleClose);
    };
  }, []);

  return { dialogRef };
};
