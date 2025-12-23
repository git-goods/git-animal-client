/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FormItemVariant {
  
}

type FormItemVariantMap = {
  [key in keyof FormItemVariant]: Array<FormItemVariant[key]>
}

export type FormItemVariantProps = {
  [key in keyof FormItemVariant]?: ConditionalValue<FormItemVariant[key]> | undefined
}

export interface FormItemRecipe {
  __type: FormItemVariantProps
  (props?: FormItemVariantProps): string
  raw: (props?: FormItemVariantProps) => FormItemVariantProps
  variantMap: FormItemVariantMap
  variantKeys: Array<keyof FormItemVariant>
  splitVariantProps<Props extends FormItemVariantProps>(props: Props): [FormItemVariantProps, Pretty<DistributiveOmit<Props, keyof FormItemVariantProps>>]
  getVariantProps: (props?: FormItemVariantProps) => FormItemVariantProps
}

/**
 * Styles for the FormItem component


 */
export declare const formItem: FormItemRecipe