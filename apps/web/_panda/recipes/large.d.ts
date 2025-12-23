/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface LargeVariant {
  
}

type LargeVariantMap = {
  [key in keyof LargeVariant]: Array<LargeVariant[key]>
}

export type LargeVariantProps = {
  [key in keyof LargeVariant]?: ConditionalValue<LargeVariant[key]> | undefined
}

export interface LargeRecipe {
  __type: LargeVariantProps
  (props?: LargeVariantProps): string
  raw: (props?: LargeVariantProps) => LargeVariantProps
  variantMap: LargeVariantMap
  variantKeys: Array<keyof LargeVariant>
  splitVariantProps<Props extends LargeVariantProps>(props: Props): [LargeVariantProps, Pretty<DistributiveOmit<Props, keyof LargeVariantProps>>]
  getVariantProps: (props?: LargeVariantProps) => LargeVariantProps
}

/**
 * Typography - Large style


 */
export declare const large: LargeRecipe