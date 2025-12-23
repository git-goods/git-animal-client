/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DropdownMenuVariant {
  
}

type DropdownMenuVariantMap = {
  [key in keyof DropdownMenuVariant]: Array<DropdownMenuVariant[key]>
}

export type DropdownMenuVariantProps = {
  [key in keyof DropdownMenuVariant]?: ConditionalValue<DropdownMenuVariant[key]> | undefined
}

export interface DropdownMenuRecipe {
  __type: DropdownMenuVariantProps
  (props?: DropdownMenuVariantProps): Pretty<Record<"root" | "trigger" | "group" | "portal" | "sub" | "radioGroup" | "subTrigger" | "subContent" | "content" | "item" | "itemIndicator" | "checkboxItem" | "radioItem" | "label" | "separator" | "shortcut", string>>
  raw: (props?: DropdownMenuVariantProps) => DropdownMenuVariantProps
  variantMap: DropdownMenuVariantMap
  variantKeys: Array<keyof DropdownMenuVariant>
  splitVariantProps<Props extends DropdownMenuVariantProps>(props: Props): [DropdownMenuVariantProps, Pretty<DistributiveOmit<Props, keyof DropdownMenuVariantProps>>]
  getVariantProps: (props?: DropdownMenuVariantProps) => DropdownMenuVariantProps
}

/**
 * Styles for the DropdownMenu component


 */
export declare const dropdownMenu: DropdownMenuRecipe