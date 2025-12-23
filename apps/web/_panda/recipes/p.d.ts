/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface PVariant {
  
}

type PVariantMap = {
  [key in keyof PVariant]: Array<PVariant[key]>
}

export type PVariantProps = {
  [key in keyof PVariant]?: ConditionalValue<PVariant[key]> | undefined
}

export interface PRecipe {
  __type: PVariantProps
  (props?: PVariantProps): string
  raw: (props?: PVariantProps) => PVariantProps
  variantMap: PVariantMap
  variantKeys: Array<keyof PVariant>
  splitVariantProps<Props extends PVariantProps>(props: Props): [PVariantProps, Pretty<DistributiveOmit<Props, keyof PVariantProps>>]
  getVariantProps: (props?: PVariantProps) => PVariantProps
}

/**
 * Typography - p style


 */
export declare const p: PRecipe