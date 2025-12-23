/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableCaptionVariant {
  
}

type TableCaptionVariantMap = {
  [key in keyof TableCaptionVariant]: Array<TableCaptionVariant[key]>
}

export type TableCaptionVariantProps = {
  [key in keyof TableCaptionVariant]?: ConditionalValue<TableCaptionVariant[key]> | undefined
}

export interface TableCaptionRecipe {
  __type: TableCaptionVariantProps
  (props?: TableCaptionVariantProps): string
  raw: (props?: TableCaptionVariantProps) => TableCaptionVariantProps
  variantMap: TableCaptionVariantMap
  variantKeys: Array<keyof TableCaptionVariant>
  splitVariantProps<Props extends TableCaptionVariantProps>(props: Props): [TableCaptionVariantProps, Pretty<DistributiveOmit<Props, keyof TableCaptionVariantProps>>]
  getVariantProps: (props?: TableCaptionVariantProps) => TableCaptionVariantProps
}

/**
 * Styles for the TableCaption component


 */
export declare const tableCaption: TableCaptionRecipe