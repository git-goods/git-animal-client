import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dropdownMenuDefaultVariants = {}
const dropdownMenuCompoundVariants = []

const dropdownMenuSlotNames = [
  [
    "root",
    "dropdownMenu__root"
  ],
  [
    "trigger",
    "dropdownMenu__trigger"
  ],
  [
    "group",
    "dropdownMenu__group"
  ],
  [
    "portal",
    "dropdownMenu__portal"
  ],
  [
    "sub",
    "dropdownMenu__sub"
  ],
  [
    "radioGroup",
    "dropdownMenu__radioGroup"
  ],
  [
    "subTrigger",
    "dropdownMenu__subTrigger"
  ],
  [
    "subContent",
    "dropdownMenu__subContent"
  ],
  [
    "content",
    "dropdownMenu__content"
  ],
  [
    "item",
    "dropdownMenu__item"
  ],
  [
    "itemIndicator",
    "dropdownMenu__itemIndicator"
  ],
  [
    "checkboxItem",
    "dropdownMenu__checkboxItem"
  ],
  [
    "radioItem",
    "dropdownMenu__radioItem"
  ],
  [
    "label",
    "dropdownMenu__label"
  ],
  [
    "separator",
    "dropdownMenu__separator"
  ],
  [
    "shortcut",
    "dropdownMenu__shortcut"
  ]
]
const dropdownMenuSlotFns = /* @__PURE__ */ dropdownMenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dropdownMenuDefaultVariants, getSlotCompoundVariant(dropdownMenuCompoundVariants, slotName))])

const dropdownMenuFn = memo((props = {}) => {
  return Object.fromEntries(dropdownMenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dropdownMenuVariantKeys = []
const getVariantProps = (variants) => ({ ...dropdownMenuDefaultVariants, ...compact(variants) })

export const dropdownMenu = /* @__PURE__ */ Object.assign(dropdownMenuFn, {
  __recipe__: false,
  __name__: 'dropdownMenu',
  raw: (props) => props,
  variantKeys: dropdownMenuVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, dropdownMenuVariantKeys)
  },
  getVariantProps
})