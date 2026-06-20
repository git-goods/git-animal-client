import { cva, type VariantProps } from 'class-variance-authority';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Banner(`cva.ts`)와 1:1.
 *
 * panda base 는 borderColor 만 transparent 로 두고 border-width 는 두지 않는다
 * (2px solid 는 status=selected 에서만 생김). dev 변환본은 base 에 border-2 를
 * 항상 박고 transition-all·rounded-xl·white/25(opacity 모디파이어)·gradient-to-br
 * 로 근사해놔서 폐기했다. 색은 white 토큰(white-50/25/10) 클래스로,
 * gradient 는 133deg 원본 그대로 arbitrary 로 재현한다.
 */
export const bannerVariants = cva(
  'relative flex flex-col items-center justify-center overflow-hidden rounded-[12px] border-transparent transition-[border,background-color] duration-300',
  {
    variants: {
      status: {
        selected: 'border-2 border-white-50 bg-white-25',
        gradient:
          'bg-[linear-gradient(133deg,rgba(255,253,201,0.40)_2.19%,rgba(150,230,216,0.40)_49.24%,rgba(125,171,241,0.40)_98.21%)]',
        default: 'bg-white-10',
      },
      size: {
        small:
          'h-[80px] w-[80px] [&_img]:h-full [&_img]:w-full [&_img]:object-contain mobile:h-[52px] mobile:w-[52px] mobile:rounded-[5px]',
        medium: 'h-[149px] w-[120px] px-[20px] py-[12px]',
        full: 'h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain',
      },
    },
    defaultVariants: {
      size: 'medium',
      status: 'default',
    },
  },
);

export type BannerStyleProps = VariantProps<typeof bannerVariants>;
