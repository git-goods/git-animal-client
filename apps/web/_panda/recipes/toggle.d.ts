/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ToggleVariant {
  /**
 * @default "default"
 */
variant: "default" | "outline"
/**
 * @default "default"
 */
size: "default" | "sm" | "lg"
}

type ToggleVariantMap = {
  [key in keyof ToggleVariant]: Array<ToggleVariant[key]>
}

export type ToggleVariantProps = {
  [key in keyof ToggleVariant]?: ConditionalValue<ToggleVariant[key]> | undefined
}

export interface ToggleRecipe {
  __type: ToggleVariantProps
  (props?: ToggleVariantProps): string
  raw: (props?: ToggleVariantProps) => ToggleVariantProps
  variantMap: ToggleVariantMap
  variantKeys: Array<keyof ToggleVariant>
  splitVariantProps<Props extends ToggleVariantProps>(props: Props): [ToggleVariantProps, Pretty<DistributiveOmit<Props, keyof ToggleVariantProps>>]
  getVariantProps: (props?: ToggleVariantProps) => ToggleVariantProps
}

/**
 * Styles for the Toggle component


 */
export declare const toggle: ToggleRecipe