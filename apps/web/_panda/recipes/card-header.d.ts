/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CardHeaderVariant {
  
}

type CardHeaderVariantMap = {
  [key in keyof CardHeaderVariant]: Array<CardHeaderVariant[key]>
}

export type CardHeaderVariantProps = {
  [key in keyof CardHeaderVariant]?: ConditionalValue<CardHeaderVariant[key]> | undefined
}

export interface CardHeaderRecipe {
  __type: CardHeaderVariantProps
  (props?: CardHeaderVariantProps): string
  raw: (props?: CardHeaderVariantProps) => CardHeaderVariantProps
  variantMap: CardHeaderVariantMap
  variantKeys: Array<keyof CardHeaderVariant>
  splitVariantProps<Props extends CardHeaderVariantProps>(props: Props): [CardHeaderVariantProps, Pretty<DistributiveOmit<Props, keyof CardHeaderVariantProps>>]
  getVariantProps: (props?: CardHeaderVariantProps) => CardHeaderVariantProps
}

/**
 * Styles for the CardHeader component


 */
export declare const cardHeader: CardHeaderRecipe