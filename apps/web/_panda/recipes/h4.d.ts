/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface H4Variant {
  
}

type H4VariantMap = {
  [key in keyof H4Variant]: Array<H4Variant[key]>
}

export type H4VariantProps = {
  [key in keyof H4Variant]?: ConditionalValue<H4Variant[key]> | undefined
}

export interface H4Recipe {
  __type: H4VariantProps
  (props?: H4VariantProps): string
  raw: (props?: H4VariantProps) => H4VariantProps
  variantMap: H4VariantMap
  variantKeys: Array<keyof H4Variant>
  splitVariantProps<Props extends H4VariantProps>(props: Props): [H4VariantProps, Pretty<DistributiveOmit<Props, keyof H4VariantProps>>]
  getVariantProps: (props?: H4VariantProps) => H4VariantProps
}

/**
 * Typography - h4 style


 */
export declare const h4: H4Recipe