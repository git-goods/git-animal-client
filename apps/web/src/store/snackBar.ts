import { atom } from 'jotai';

export interface SnackBarProps {
  id: string;
  message: string;
  duration?: number;
  showClose?: boolean;
  onClose?: (id: string) => void;
}

export const snackBarsAtom = atom<SnackBarProps[]>([]);
