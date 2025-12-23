/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FormMessageVariant {
  
}

type FormMessageVariantMap = {
  [key in keyof FormMessageVariant]: Array<FormMessageVariant[key]>
}

export type FormMessageVariantProps = {
  [key in keyof FormMessageVariant]?: ConditionalValue<FormMessageVariant[key]> | undefined
}

export interface FormMessageRecipe {
  __type: FormMessageVariantProps
  (props?: FormMessageVariantProps): string
  raw: (props?: FormMessageVariantProps) => FormMessageVariantProps
  variantMap: FormMessageVariantMap
  variantKeys: Array<keyof FormMessageVariant>
  splitVariantProps<Props extends FormMessageVariantProps>(props: Props): [FormMessageVariantProps, Pretty<DistributiveOmit<Props, keyof FormMessageVariantProps>>]
  getVariantProps: (props?: FormMessageVariantProps) => FormMessageVariantProps
}

/**
 * Styles for the FormMessage component


 */
export declare const formMessage: FormMessageRecipe