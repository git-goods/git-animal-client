/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ListVariant {
  
}

type ListVariantMap = {
  [key in keyof ListVariant]: Array<ListVariant[key]>
}

export type ListVariantProps = {
  [key in keyof ListVariant]?: ConditionalValue<ListVariant[key]> | undefined
}

export interface ListRecipe {
  __type: ListVariantProps
  (props?: ListVariantProps): string
  raw: (props?: ListVariantProps) => ListVariantProps
  variantMap: ListVariantMap
  variantKeys: Array<keyof ListVariant>
  splitVariantProps<Props extends ListVariantProps>(props: Props): [ListVariantProps, Pretty<DistributiveOmit<Props, keyof ListVariantProps>>]
  getVariantProps: (props?: ListVariantProps) => ListVariantProps
}

/**
 * Typography - list style


 */
export declare const list: ListRecipe