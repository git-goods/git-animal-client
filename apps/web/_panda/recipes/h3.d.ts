/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface H3Variant {
  
}

type H3VariantMap = {
  [key in keyof H3Variant]: Array<H3Variant[key]>
}

export type H3VariantProps = {
  [key in keyof H3Variant]?: ConditionalValue<H3Variant[key]> | undefined
}

export interface H3Recipe {
  __type: H3VariantProps
  (props?: H3VariantProps): string
  raw: (props?: H3VariantProps) => H3VariantProps
  variantMap: H3VariantMap
  variantKeys: Array<keyof H3Variant>
  splitVariantProps<Props extends H3VariantProps>(props: Props): [H3VariantProps, Pretty<DistributiveOmit<Props, keyof H3VariantProps>>]
  getVariantProps: (props?: H3VariantProps) => H3VariantProps
}

/**
 * Typography - h3 style


 */
export declare const h3: H3Recipe