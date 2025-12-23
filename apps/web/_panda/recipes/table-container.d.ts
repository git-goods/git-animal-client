/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableContainerVariant {
  
}

type TableContainerVariantMap = {
  [key in keyof TableContainerVariant]: Array<TableContainerVariant[key]>
}

export type TableContainerVariantProps = {
  [key in keyof TableContainerVariant]?: ConditionalValue<TableContainerVariant[key]> | undefined
}

export interface TableContainerRecipe {
  __type: TableContainerVariantProps
  (props?: TableContainerVariantProps): string
  raw: (props?: TableContainerVariantProps) => TableContainerVariantProps
  variantMap: TableContainerVariantMap
  variantKeys: Array<keyof TableContainerVariant>
  splitVariantProps<Props extends TableContainerVariantProps>(props: Props): [TableContainerVariantProps, Pretty<DistributiveOmit<Props, keyof TableContainerVariantProps>>]
  getVariantProps: (props?: TableContainerVariantProps) => TableContainerVariantProps
}

/**
 * Styles for the TableContainer component


 */
export declare const tableContainer: TableContainerRecipe