/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TypographyTableContainerVariant {
  
}

type TypographyTableContainerVariantMap = {
  [key in keyof TypographyTableContainerVariant]: Array<TypographyTableContainerVariant[key]>
}

export type TypographyTableContainerVariantProps = {
  [key in keyof TypographyTableContainerVariant]?: ConditionalValue<TypographyTableContainerVariant[key]> | undefined
}

export interface TypographyTableContainerRecipe {
  __type: TypographyTableContainerVariantProps
  (props?: TypographyTableContainerVariantProps): string
  raw: (props?: TypographyTableContainerVariantProps) => TypographyTableContainerVariantProps
  variantMap: TypographyTableContainerVariantMap
  variantKeys: Array<keyof TypographyTableContainerVariant>
  splitVariantProps<Props extends TypographyTableContainerVariantProps>(props: Props): [TypographyTableContainerVariantProps, Pretty<DistributiveOmit<Props, keyof TypographyTableContainerVariantProps>>]
  getVariantProps: (props?: TypographyTableContainerVariantProps) => TypographyTableContainerVariantProps
}

/**
 * Typography - table container style


 */
export declare const typographyTableContainer: TypographyTableContainerRecipe