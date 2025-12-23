/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface H2Variant {
  
}

type H2VariantMap = {
  [key in keyof H2Variant]: Array<H2Variant[key]>
}

export type H2VariantProps = {
  [key in keyof H2Variant]?: ConditionalValue<H2Variant[key]> | undefined
}

export interface H2Recipe {
  __type: H2VariantProps
  (props?: H2VariantProps): string
  raw: (props?: H2VariantProps) => H2VariantProps
  variantMap: H2VariantMap
  variantKeys: Array<keyof H2Variant>
  splitVariantProps<Props extends H2VariantProps>(props: Props): [H2VariantProps, Pretty<DistributiveOmit<Props, keyof H2VariantProps>>]
  getVariantProps: (props?: H2VariantProps) => H2VariantProps
}

/**
 * Typography - h2 style


 */
export declare const h2: H2Recipe