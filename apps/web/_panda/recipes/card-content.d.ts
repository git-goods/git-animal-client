/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CardContentVariant {
  
}

type CardContentVariantMap = {
  [key in keyof CardContentVariant]: Array<CardContentVariant[key]>
}

export type CardContentVariantProps = {
  [key in keyof CardContentVariant]?: ConditionalValue<CardContentVariant[key]> | undefined
}

export interface CardContentRecipe {
  __type: CardContentVariantProps
  (props?: CardContentVariantProps): string
  raw: (props?: CardContentVariantProps) => CardContentVariantProps
  variantMap: CardContentVariantMap
  variantKeys: Array<keyof CardContentVariant>
  splitVariantProps<Props extends CardContentVariantProps>(props: Props): [CardContentVariantProps, Pretty<DistributiveOmit<Props, keyof CardContentVariantProps>>]
  getVariantProps: (props?: CardContentVariantProps) => CardContentVariantProps
}

/**
 * Styles for the CardContent component


 */
export declare const cardContent: CardContentRecipe