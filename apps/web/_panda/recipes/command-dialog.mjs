import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const commandDialogDefaultVariants = {}
const commandDialogCompoundVariants = []

const commandDialogSlotNames = [
  [
    "content",
    "command-dialog__content"
  ],
  [
    "command",
    "command-dialog__command"
  ]
]
const commandDialogSlotFns = /* @__PURE__ */ commandDialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, commandDialogDefaultVariants, getSlotCompoundVariant(commandDialogCompoundVariants, slotName))])

const commandDialogFn = memo((props = {}) => {
  return Object.fromEntries(commandDialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const commandDialogVariantKeys = []
const getVariantProps = (variants) => ({ ...commandDialogDefaultVariants, ...compact(variants) })

export const commandDialog = /* @__PURE__ */ Object.assign(commandDialogFn, {
  __recipe__: false,
  __name__: 'commandDialog',
  raw: (props) => props,
  variantKeys: commandDialogVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, commandDialogVariantKeys)
  },
  getVariantProps
})