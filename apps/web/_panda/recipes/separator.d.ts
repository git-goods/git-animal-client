/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SeparatorVariant {
  /**
 * @default "horizontal"
 */
orientation: "horizontal" | "vertical"
}

type SeparatorVariantMap = {
  [key in keyof SeparatorVariant]: Array<SeparatorVariant[key]>
}

export type SeparatorVariantProps = {
  [key in keyof SeparatorVariant]?: ConditionalValue<SeparatorVariant[key]> | undefined
}

export interface SeparatorRecipe {
  __type: SeparatorVariantProps
  (props?: SeparatorVariantProps): string
  raw: (props?: SeparatorVariantProps) => SeparatorVariantProps
  variantMap: SeparatorVariantMap
  variantKeys: Array<keyof SeparatorVariant>
  splitVariantProps<Props extends SeparatorVariantProps>(props: Props): [SeparatorVariantProps, Pretty<DistributiveOmit<Props, keyof SeparatorVariantProps>>]
  getVariantProps: (props?: SeparatorVariantProps) => SeparatorVariantProps
}

/**
 * Styles for the Separator component


 */
export declare const separator: SeparatorRecipe