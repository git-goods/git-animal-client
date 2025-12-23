/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FormControlVariant {
  
}

type FormControlVariantMap = {
  [key in keyof FormControlVariant]: Array<FormControlVariant[key]>
}

export type FormControlVariantProps = {
  [key in keyof FormControlVariant]?: ConditionalValue<FormControlVariant[key]> | undefined
}

export interface FormControlRecipe {
  __type: FormControlVariantProps
  (props?: FormControlVariantProps): string
  raw: (props?: FormControlVariantProps) => FormControlVariantProps
  variantMap: FormControlVariantMap
  variantKeys: Array<keyof FormControlVariant>
  splitVariantProps<Props extends FormControlVariantProps>(props: Props): [FormControlVariantProps, Pretty<DistributiveOmit<Props, keyof FormControlVariantProps>>]
  getVariantProps: (props?: FormControlVariantProps) => FormControlVariantProps
}

/**
 * Styles for the FormControl component


 */
export declare const formControl: FormControlRecipe