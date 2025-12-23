/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AlertTitleVariant {
  
}

type AlertTitleVariantMap = {
  [key in keyof AlertTitleVariant]: Array<AlertTitleVariant[key]>
}

export type AlertTitleVariantProps = {
  [key in keyof AlertTitleVariant]?: ConditionalValue<AlertTitleVariant[key]> | undefined
}

export interface AlertTitleRecipe {
  __type: AlertTitleVariantProps
  (props?: AlertTitleVariantProps): string
  raw: (props?: AlertTitleVariantProps) => AlertTitleVariantProps
  variantMap: AlertTitleVariantMap
  variantKeys: Array<keyof AlertTitleVariant>
  splitVariantProps<Props extends AlertTitleVariantProps>(props: Props): [AlertTitleVariantProps, Pretty<DistributiveOmit<Props, keyof AlertTitleVariantProps>>]
  getVariantProps: (props?: AlertTitleVariantProps) => AlertTitleVariantProps
}

/**
 * Styles for the AlertTitle component


 */
export declare const alertTitle: AlertTitleRecipe