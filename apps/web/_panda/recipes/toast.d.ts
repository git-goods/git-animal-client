/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ToastVariant {
  /**
 * @default "default"
 */
variant: "default" | "destructive"
}

type ToastVariantMap = {
  [key in keyof ToastVariant]: Array<ToastVariant[key]>
}

export type ToastVariantProps = {
  [key in keyof ToastVariant]?: ConditionalValue<ToastVariant[key]> | undefined
}

export interface ToastRecipe {
  __type: ToastVariantProps
  (props?: ToastVariantProps): Pretty<Record<"root" | "viewport" | "action" | "close" | "title" | "description", string>>
  raw: (props?: ToastVariantProps) => ToastVariantProps
  variantMap: ToastVariantMap
  variantKeys: Array<keyof ToastVariant>
  splitVariantProps<Props extends ToastVariantProps>(props: Props): [ToastVariantProps, Pretty<DistributiveOmit<Props, keyof ToastVariantProps>>]
  getVariantProps: (props?: ToastVariantProps) => ToastVariantProps
}

/**
 * Styles for the Toast component


 */
export declare const toast: ToastRecipe