/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface IconVariant {
  /**
 * @default "md"
 */
size: "xl" | "lg" | "md" | "sm" | "xs"
/**
 * @default "none"
 */
left: "none" | "sm" | "auto"
/**
 * @default "none"
 */
right: "none" | "sm" | "auto"
/**
 * @default false
 */
fillCurrent: boolean
/**
 * @default false
 */
dimmed: boolean
}

type IconVariantMap = {
  [key in keyof IconVariant]: Array<IconVariant[key]>
}

export type IconVariantProps = {
  [key in keyof IconVariant]?: ConditionalValue<IconVariant[key]> | undefined
}

export interface IconRecipe {
  __type: IconVariantProps
  (props?: IconVariantProps): string
  raw: (props?: IconVariantProps) => IconVariantProps
  variantMap: IconVariantMap
  variantKeys: Array<keyof IconVariant>
  splitVariantProps<Props extends IconVariantProps>(props: Props): [IconVariantProps, Pretty<DistributiveOmit<Props, keyof IconVariantProps>>]
  getVariantProps: (props?: IconVariantProps) => IconVariantProps
}

/**
 * Styles for the icons


 */
export declare const icon: IconRecipe