/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface MenubarVariant {
  
}

type MenubarVariantMap = {
  [key in keyof MenubarVariant]: Array<MenubarVariant[key]>
}

export type MenubarVariantProps = {
  [key in keyof MenubarVariant]?: ConditionalValue<MenubarVariant[key]> | undefined
}

export interface MenubarRecipe {
  __type: MenubarVariantProps
  (props?: MenubarVariantProps): Pretty<Record<"root" | "menu" | "group" | "portal" | "sub" | "radioGroup" | "trigger" | "subTrigger" | "subContent" | "content" | "item" | "checkboxItem" | "radioItem" | "itemIndicator" | "label" | "separator" | "shortcut", string>>
  raw: (props?: MenubarVariantProps) => MenubarVariantProps
  variantMap: MenubarVariantMap
  variantKeys: Array<keyof MenubarVariant>
  splitVariantProps<Props extends MenubarVariantProps>(props: Props): [MenubarVariantProps, Pretty<DistributiveOmit<Props, keyof MenubarVariantProps>>]
  getVariantProps: (props?: MenubarVariantProps) => MenubarVariantProps
}

/**
 * Styles for the Menubar component


 */
export declare const menubar: MenubarRecipe