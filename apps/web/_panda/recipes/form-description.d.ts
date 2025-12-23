/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FormDescriptionVariant {
  
}

type FormDescriptionVariantMap = {
  [key in keyof FormDescriptionVariant]: Array<FormDescriptionVariant[key]>
}

export type FormDescriptionVariantProps = {
  [key in keyof FormDescriptionVariant]?: ConditionalValue<FormDescriptionVariant[key]> | undefined
}

export interface FormDescriptionRecipe {
  __type: FormDescriptionVariantProps
  (props?: FormDescriptionVariantProps): string
  raw: (props?: FormDescriptionVariantProps) => FormDescriptionVariantProps
  variantMap: FormDescriptionVariantMap
  variantKeys: Array<keyof FormDescriptionVariant>
  splitVariantProps<Props extends FormDescriptionVariantProps>(props: Props): [FormDescriptionVariantProps, Pretty<DistributiveOmit<Props, keyof FormDescriptionVariantProps>>]
  getVariantProps: (props?: FormDescriptionVariantProps) => FormDescriptionVariantProps
}

/**
 * Styles for the FormDescription component


 */
export declare const formDescription: FormDescriptionRecipe