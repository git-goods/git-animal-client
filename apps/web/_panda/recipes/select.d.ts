/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SelectVariant {
  
}

type SelectVariantMap = {
  [key in keyof SelectVariant]: Array<SelectVariant[key]>
}

export type SelectVariantProps = {
  [key in keyof SelectVariant]?: ConditionalValue<SelectVariant[key]> | undefined
}

export interface SelectRecipe {
  __type: SelectVariantProps
  (props?: SelectVariantProps): Pretty<Record<"root" | "group" | "value" | "trigger" | "viewport" | "content" | "label" | "item" | "itemIndicator" | "separator", string>>
  raw: (props?: SelectVariantProps) => SelectVariantProps
  variantMap: SelectVariantMap
  variantKeys: Array<keyof SelectVariant>
  splitVariantProps<Props extends SelectVariantProps>(props: Props): [SelectVariantProps, Pretty<DistributiveOmit<Props, keyof SelectVariantProps>>]
  getVariantProps: (props?: SelectVariantProps) => SelectVariantProps
}

/**
 * Styles for the Select component


 */
export declare const select: SelectRecipe