/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BlockquoteVariant {
  
}

type BlockquoteVariantMap = {
  [key in keyof BlockquoteVariant]: Array<BlockquoteVariant[key]>
}

export type BlockquoteVariantProps = {
  [key in keyof BlockquoteVariant]?: ConditionalValue<BlockquoteVariant[key]> | undefined
}

export interface BlockquoteRecipe {
  __type: BlockquoteVariantProps
  (props?: BlockquoteVariantProps): string
  raw: (props?: BlockquoteVariantProps) => BlockquoteVariantProps
  variantMap: BlockquoteVariantMap
  variantKeys: Array<keyof BlockquoteVariant>
  splitVariantProps<Props extends BlockquoteVariantProps>(props: Props): [BlockquoteVariantProps, Pretty<DistributiveOmit<Props, keyof BlockquoteVariantProps>>]
  getVariantProps: (props?: BlockquoteVariantProps) => BlockquoteVariantProps
}

/**
 * Typography - blockquote style


 */
export declare const blockquote: BlockquoteRecipe