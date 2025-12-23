/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CommandVariant {
  
}

type CommandVariantMap = {
  [key in keyof CommandVariant]: Array<CommandVariant[key]>
}

export type CommandVariantProps = {
  [key in keyof CommandVariant]?: ConditionalValue<CommandVariant[key]> | undefined
}

export interface CommandRecipe {
  __type: CommandVariantProps
  (props?: CommandVariantProps): Pretty<Record<"root" | "inputWrapper" | "inputSearch" | "input" | "list" | "empty" | "group" | "separator" | "item" | "shortcut", string>>
  raw: (props?: CommandVariantProps) => CommandVariantProps
  variantMap: CommandVariantMap
  variantKeys: Array<keyof CommandVariant>
  splitVariantProps<Props extends CommandVariantProps>(props: Props): [CommandVariantProps, Pretty<DistributiveOmit<Props, keyof CommandVariantProps>>]
  getVariantProps: (props?: CommandVariantProps) => CommandVariantProps
}

/**
 * Styles for the Command component


 */
export declare const command: CommandRecipe