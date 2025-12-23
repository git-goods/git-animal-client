/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CommandDialogVariant {
  
}

type CommandDialogVariantMap = {
  [key in keyof CommandDialogVariant]: Array<CommandDialogVariant[key]>
}

export type CommandDialogVariantProps = {
  [key in keyof CommandDialogVariant]?: ConditionalValue<CommandDialogVariant[key]> | undefined
}

export interface CommandDialogRecipe {
  __type: CommandDialogVariantProps
  (props?: CommandDialogVariantProps): Pretty<Record<"content" | "command", string>>
  raw: (props?: CommandDialogVariantProps) => CommandDialogVariantProps
  variantMap: CommandDialogVariantMap
  variantKeys: Array<keyof CommandDialogVariant>
  splitVariantProps<Props extends CommandDialogVariantProps>(props: Props): [CommandDialogVariantProps, Pretty<DistributiveOmit<Props, keyof CommandDialogVariantProps>>]
  getVariantProps: (props?: CommandDialogVariantProps) => CommandDialogVariantProps
}

/**
 * Styles for the CommandDialog component


 */
export declare const commandDialog: CommandDialogRecipe