import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const commandDefaultVariants = {}
const commandCompoundVariants = []

const commandSlotNames = [
  [
    "root",
    "command__root"
  ],
  [
    "inputWrapper",
    "command__inputWrapper"
  ],
  [
    "inputSearch",
    "command__inputSearch"
  ],
  [
    "input",
    "command__input"
  ],
  [
    "list",
    "command__list"
  ],
  [
    "empty",
    "command__empty"
  ],
  [
    "group",
    "command__group"
  ],
  [
    "separator",
    "command__separator"
  ],
  [
    "item",
    "command__item"
  ],
  [
    "shortcut",
    "command__shortcut"
  ]
]
const commandSlotFns = /* @__PURE__ */ commandSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, commandDefaultVariants, getSlotCompoundVariant(commandCompoundVariants, slotName))])

const commandFn = memo((props = {}) => {
  return Object.fromEntries(commandSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const commandVariantKeys = []
const getVariantProps = (variants) => ({ ...commandDefaultVariants, ...compact(variants) })

export const command = /* @__PURE__ */ Object.assign(commandFn, {
  __recipe__: false,
  __name__: 'command',
  raw: (props) => props,
  variantKeys: commandVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, commandVariantKeys)
  },
  getVariantProps
})