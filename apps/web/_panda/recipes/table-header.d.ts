/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableHeaderVariant {
  
}

type TableHeaderVariantMap = {
  [key in keyof TableHeaderVariant]: Array<TableHeaderVariant[key]>
}

export type TableHeaderVariantProps = {
  [key in keyof TableHeaderVariant]?: ConditionalValue<TableHeaderVariant[key]> | undefined
}

export interface TableHeaderRecipe {
  __type: TableHeaderVariantProps
  (props?: TableHeaderVariantProps): string
  raw: (props?: TableHeaderVariantProps) => TableHeaderVariantProps
  variantMap: TableHeaderVariantMap
  variantKeys: Array<keyof TableHeaderVariant>
  splitVariantProps<Props extends TableHeaderVariantProps>(props: Props): [TableHeaderVariantProps, Pretty<DistributiveOmit<Props, keyof TableHeaderVariantProps>>]
  getVariantProps: (props?: TableHeaderVariantProps) => TableHeaderVariantProps
}

/**
 * Styles for the TableHeader component


 */
export declare const tableHeader: TableHeaderRecipe