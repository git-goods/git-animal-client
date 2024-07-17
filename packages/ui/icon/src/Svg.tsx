import { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  /**
   * @description fill 색상 값입니다. `isUsingFill`로 사용하지 않을 수 있습니다.
   * @default `currentColor`
   */
  color?: string;

  /**
   * @description height 값입니다. size가 존재하더라도 해당 값이 사용됩니다.
   * @default `24`
   */
  height?: number;

  /**
   * @description `color` prop으로 fill을 사용할 지에 대한 여부입니다.
   * 보통은 사용되지 않으나 SVG의 구성이 특이하여 parent의 fill로는 해결되지 않을 때에 사용합니다.
   * @default `false`
   */
  isUsingFill?: boolean;

  /**
   * @description width, height 값입니다. 사전 지정된 width, height이 존재한다면 무시됩니다.
   * @default `24`
   */
  size?: number;

  /**
   * @description width 값입니다. size가 존재하더라도 해당 값이 사용됩니다.
   * @default `24`
   */
  width?: number;
}

const Svg: FC<Props> = ({ children, color, height, isUsingFill = false, size, viewBox, width, ...rest }) => {
  return (
    <svg
      fill={isUsingFill ? color ?? 'currentColor' : 'none'}
      height={height ?? size ?? 24}
      viewBox={viewBox ?? `0 0 ${width ?? size ?? 24} ${height ?? size ?? 24}`}
      width={width ?? size ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Svg;
