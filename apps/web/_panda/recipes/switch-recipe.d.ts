/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SwitchRecipeVariant {
  
}

type SwitchRecipeVariantMap = {
  [key in keyof SwitchRecipeVariant]: Array<SwitchRecipeVariant[key]>
}

export type SwitchRecipeVariantProps = {
  [key in keyof SwitchRecipeVariant]?: ConditionalValue<SwitchRecipeVariant[key]> | undefined
}

export interface SwitchRecipeRecipe {
  __type: SwitchRecipeVariantProps
  (props?: SwitchRecipeVariantProps): Pretty<Record<"root" | "thumb", string>>
  raw: (props?: SwitchRecipeVariantProps) => SwitchRecipeVariantProps
  variantMap: SwitchRecipeVariantMap
  variantKeys: Array<keyof SwitchRecipeVariant>
  splitVariantProps<Props extends SwitchRecipeVariantProps>(props: Props): [SwitchRecipeVariantProps, Pretty<DistributiveOmit<Props, keyof SwitchRecipeVariantProps>>]
  getVariantProps: (props?: SwitchRecipeVariantProps) => SwitchRecipeVariantProps
}

/**
 * Styles for the Switch component


 */
export declare const switchRecipe: SwitchRecipeRecipe