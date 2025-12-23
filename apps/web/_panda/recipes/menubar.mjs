import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const menubarDefaultVariants = {}
const menubarCompoundVariants = []

const menubarSlotNames = [
  [
    "root",
    "menubar__root"
  ],
  [
    "menu",
    "menubar__menu"
  ],
  [
    "group",
    "menubar__group"
  ],
  [
    "portal",
    "menubar__portal"
  ],
  [
    "sub",
    "menubar__sub"
  ],
  [
    "radioGroup",
    "menubar__radioGroup"
  ],
  [
    "trigger",
    "menubar__trigger"
  ],
  [
    "subTrigger",
    "menubar__subTrigger"
  ],
  [
    "subContent",
    "menubar__subContent"
  ],
  [
    "content",
    "menubar__content"
  ],
  [
    "item",
    "menubar__item"
  ],
  [
    "checkboxItem",
    "menubar__checkboxItem"
  ],
  [
    "radioItem",
    "menubar__radioItem"
  ],
  [
    "itemIndicator",
    "menubar__itemIndicator"
  ],
  [
    "label",
    "menubar__label"
  ],
  [
    "separator",
    "menubar__separator"
  ],
  [
    "shortcut",
    "menubar__shortcut"
  ]
]
const menubarSlotFns = /* @__PURE__ */ menubarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, menubarDefaultVariants, getSlotCompoundVariant(menubarCompoundVariants, slotName))])

const menubarFn = memo((props = {}) => {
  return Object.fromEntries(menubarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const menubarVariantKeys = []
const getVariantProps = (variants) => ({ ...menubarDefaultVariants, ...compact(variants) })

export const menubar = /* @__PURE__ */ Object.assign(menubarFn, {
  __recipe__: false,
  __name__: 'menubar',
  raw: (props) => props,
  variantKeys: menubarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, menubarVariantKeys)
  },
  getVariantProps
})