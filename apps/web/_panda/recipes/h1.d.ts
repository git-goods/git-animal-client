/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface H1Variant {
  
}

type H1VariantMap = {
  [key in keyof H1Variant]: Array<H1Variant[key]>
}

export type H1VariantProps = {
  [key in keyof H1Variant]?: ConditionalValue<H1Variant[key]> | undefined
}

export interface H1Recipe {
  __type: H1VariantProps
  (props?: H1VariantProps): string
  raw: (props?: H1VariantProps) => H1VariantProps
  variantMap: H1VariantMap
  variantKeys: Array<keyof H1Variant>
  splitVariantProps<Props extends H1VariantProps>(props: Props): [H1VariantProps, Pretty<DistributiveOmit<Props, keyof H1VariantProps>>]
  getVariantProps: (props?: H1VariantProps) => H1VariantProps
}

/**
 * Typography - h1 style


 */
export declare const h1: H1Recipe