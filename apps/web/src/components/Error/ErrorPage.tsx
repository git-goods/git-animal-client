import type { ReactNode } from 'react';
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
    <main className={mainCss}>
      <h1 className={h1Css}>{heading}</h1>
      {paragraph && <div className={pCss}>{paragraph}</div>}
      <div className={buttonCss}>
        {onClickButton && <Button onClick={onClickButton}>{buttonText}</Button>}
        {secondButtonElement}
      </div>
    </main>
  );
}

const buttonCss = 'flex justify-center w-full gap-[16px]';

const mainCss =
  'bg-white w-[100dvw] h-[100dvh] glyph16-regular py-0 px-[16px] flex flex-col items-center justify-center';

const h1Css = 'glyph40-bold mb-[12px]';

const pCss = 'mb-[32px] [&_a]:underline [&_a]:text-[blue]';
