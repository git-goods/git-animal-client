/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SmallVariant {
  
}

type SmallVariantMap = {
  [key in keyof SmallVariant]: Array<SmallVariant[key]>
}

export type SmallVariantProps = {
  [key in keyof SmallVariant]?: ConditionalValue<SmallVariant[key]> | undefined
}

export interface SmallRecipe {
  __type: SmallVariantProps
  (props?: SmallVariantProps): string
  raw: (props?: SmallVariantProps) => SmallVariantProps
  variantMap: SmallVariantMap
  variantKeys: Array<keyof SmallVariant>
  splitVariantProps<Props extends SmallVariantProps>(props: Props): [SmallVariantProps, Pretty<DistributiveOmit<Props, keyof SmallVariantProps>>]
  getVariantProps: (props?: SmallVariantProps) => SmallVariantProps
}

/**
 * Typography - Small style


 */
export declare const small: SmallRecipe