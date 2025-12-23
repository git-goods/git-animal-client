/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CardFooterVariant {
  
}

type CardFooterVariantMap = {
  [key in keyof CardFooterVariant]: Array<CardFooterVariant[key]>
}

export type CardFooterVariantProps = {
  [key in keyof CardFooterVariant]?: ConditionalValue<CardFooterVariant[key]> | undefined
}

export interface CardFooterRecipe {
  __type: CardFooterVariantProps
  (props?: CardFooterVariantProps): string
  raw: (props?: CardFooterVariantProps) => CardFooterVariantProps
  variantMap: CardFooterVariantMap
  variantKeys: Array<keyof CardFooterVariant>
  splitVariantProps<Props extends CardFooterVariantProps>(props: Props): [CardFooterVariantProps, Pretty<DistributiveOmit<Props, keyof CardFooterVariantProps>>]
  getVariantProps: (props?: CardFooterVariantProps) => CardFooterVariantProps
}

/**
 * Styles for the CardFooter component


 */
export declare const cardFooter: CardFooterRecipe