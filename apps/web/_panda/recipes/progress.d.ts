/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ProgressVariant {
  
}

type ProgressVariantMap = {
  [key in keyof ProgressVariant]: Array<ProgressVariant[key]>
}

export type ProgressVariantProps = {
  [key in keyof ProgressVariant]?: ConditionalValue<ProgressVariant[key]> | undefined
}

export interface ProgressRecipe {
  __type: ProgressVariantProps
  (props?: ProgressVariantProps): Pretty<Record<"root" | "indicator", string>>
  raw: (props?: ProgressVariantProps) => ProgressVariantProps
  variantMap: ProgressVariantMap
  variantKeys: Array<keyof ProgressVariant>
  splitVariantProps<Props extends ProgressVariantProps>(props: Props): [ProgressVariantProps, Pretty<DistributiveOmit<Props, keyof ProgressVariantProps>>]
  getVariantProps: (props?: ProgressVariantProps) => ProgressVariantProps
}

/**
 * Styles for the Progress component


 */
export declare const progress: ProgressRecipe