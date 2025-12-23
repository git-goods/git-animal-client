/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TabsVariant {
  
}

type TabsVariantMap = {
  [key in keyof TabsVariant]: Array<TabsVariant[key]>
}

export type TabsVariantProps = {
  [key in keyof TabsVariant]?: ConditionalValue<TabsVariant[key]> | undefined
}

export interface TabsRecipe {
  __type: TabsVariantProps
  (props?: TabsVariantProps): Pretty<Record<"root" | "list" | "trigger" | "content", string>>
  raw: (props?: TabsVariantProps) => TabsVariantProps
  variantMap: TabsVariantMap
  variantKeys: Array<keyof TabsVariant>
  splitVariantProps<Props extends TabsVariantProps>(props: Props): [TabsVariantProps, Pretty<DistributiveOmit<Props, keyof TabsVariantProps>>]
  getVariantProps: (props?: TabsVariantProps) => TabsVariantProps
}

/**
 * Styles for the Tabs component


 */
export declare const tabs: TabsRecipe