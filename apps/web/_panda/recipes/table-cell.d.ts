/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableCellVariant {
  
}

type TableCellVariantMap = {
  [key in keyof TableCellVariant]: Array<TableCellVariant[key]>
}

export type TableCellVariantProps = {
  [key in keyof TableCellVariant]?: ConditionalValue<TableCellVariant[key]> | undefined
}

export interface TableCellRecipe {
  __type: TableCellVariantProps
  (props?: TableCellVariantProps): string
  raw: (props?: TableCellVariantProps) => TableCellVariantProps
  variantMap: TableCellVariantMap
  variantKeys: Array<keyof TableCellVariant>
  splitVariantProps<Props extends TableCellVariantProps>(props: Props): [TableCellVariantProps, Pretty<DistributiveOmit<Props, keyof TableCellVariantProps>>]
  getVariantProps: (props?: TableCellVariantProps) => TableCellVariantProps
}

/**
 * Styles for the TableCell component


 */
export declare const tableCell: TableCellRecipe