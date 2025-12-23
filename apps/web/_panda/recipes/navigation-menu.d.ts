/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface NavigationMenuVariant {
  
}

type NavigationMenuVariantMap = {
  [key in keyof NavigationMenuVariant]: Array<NavigationMenuVariant[key]>
}

export type NavigationMenuVariantProps = {
  [key in keyof NavigationMenuVariant]?: ConditionalValue<NavigationMenuVariant[key]> | undefined
}

export interface NavigationMenuRecipe {
  __type: NavigationMenuVariantProps
  (props?: NavigationMenuVariantProps): Pretty<Record<"root" | "list" | "item" | "trigger" | "content" | "link" | "viewportWrapper" | "viewport" | "indicator", string>>
  raw: (props?: NavigationMenuVariantProps) => NavigationMenuVariantProps
  variantMap: NavigationMenuVariantMap
  variantKeys: Array<keyof NavigationMenuVariant>
  splitVariantProps<Props extends NavigationMenuVariantProps>(props: Props): [NavigationMenuVariantProps, Pretty<DistributiveOmit<Props, keyof NavigationMenuVariantProps>>]
  getVariantProps: (props?: NavigationMenuVariantProps) => NavigationMenuVariantProps
}

/**
 * Styles for the NavigationMenu component


 */
export declare const navigationMenu: NavigationMenuRecipe