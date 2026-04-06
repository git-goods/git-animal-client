import type { ReactNode } from 'react';
import { Button } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

interface Props {
  heading: string;
  paragraph?: ReactNode;
  onClickButton?: () => void;
  /**
   * @default "Retry"
   */
  buttonText?: string;
}

export function ErrorPage({ heading, paragraph, onClickButton, buttonText = 'Retry' }: Props) {
  return (
    <main
      className={cn(
        'flex h-[100dvh] w-[100dvw] flex-col items-center justify-center bg-white px-4 font-product text-glyph-16',
      )}
    >
      <h1 className="mb-3 font-product text-glyph-40 font-bold">{heading}</h1>
      {paragraph && (
        <div className="mb-8 [&_a]:text-blue-600 [&_a]:underline">{paragraph}</div>
      )}
      {onClickButton && <Button onClick={onClickButton}>{buttonText}</Button>}
    </main>
  );
}
