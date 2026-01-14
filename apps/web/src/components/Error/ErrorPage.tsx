import type { ReactNode } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import { Button } from '@gitanimals/ui-tailwind';

interface Props {
  heading: string;
  paragraph?: ReactNode;
  onClickButton?: () => void;
  /**
   * @default "Retry"
   */
  buttonText?: string;
  // TODO: Error page 다시
  secondButtonElement?: ReactNode;
}

export function ErrorPage({ heading, paragraph, onClickButton, buttonText = 'Retry', secondButtonElement }: Props) {
  return (
    <main
      className={cn(
        'bg-white w-dvw h-dvh font-product text-glyph-16 px-4',
        'flex flex-col items-center justify-center'
      )}
    >
      <h1 className="font-product text-glyph-40 font-bold mb-3">{heading}</h1>
      {paragraph && <div className="mb-8 [&_a]:underline [&_a]:text-blue-600">{paragraph}</div>}
      <div className="flex justify-center w-full gap-4">
        {onClickButton && <Button onClick={onClickButton}>{buttonText}</Button>}
        {secondButtonElement}
      </div>
    </main>
  );
}
