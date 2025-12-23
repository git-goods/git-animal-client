import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const contextMenuDefaultVariants = {
  "inset": false
}
const contextMenuCompoundVariants = []

const contextMenuSlotNames = [
  [
    "root",
    "contextMenu__root"
  ],
  [
    "trigger",
    "contextMenu__trigger"
  ],
  [
    "group",
    "contextMenu__group"
  ],
  [
    "portal",
    "contextMenu__portal"
  ],
  [
    "sub",
    "contextMenu__sub"
  ],
  [
    "radioGroup",
    "contextMenu__radioGroup"
  ],
  [
    "subTrigger",
    "contextMenu__subTrigger"
  ],
  [
    "subContent",
    "contextMenu__subContent"
  ],
  [
    "content",
    "contextMenu__content"
  ],
  [
    "item",
    "contextMenu__item"
  ],
  [
    "checkboxItem",
    "contextMenu__checkboxItem"
  ],
  [
    "radioItem",
    "contextMenu__radioItem"
  ],
  [
    "label",
    "contextMenu__label"
  ],
  [
    "separator",
    "contextMenu__separator"
  ],
  [
    "shortcut",
    "contextMenu__shortcut"
  ],
  [
    "itemIndicator",
    "contextMenu__itemIndicator"
  ]
]
const contextMenuSlotFns = /* @__PURE__ */ contextMenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, contextMenuDefaultVariants, getSlotCompoundVariant(contextMenuCompoundVariants, slotName))])

const contextMenuFn = memo((props = {}) => {
  return Object.fromEntries(contextMenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const contextMenuVariantKeys = [
  "inset"
]
const getVariantProps = (variants) => ({ ...contextMenuDefaultVariants, ...compact(variants) })

export const contextMenu = /* @__PURE__ */ Object.assign(contextMenuFn, {
  __recipe__: false,
  __name__: 'contextMenu',
  raw: (props) => props,
  variantKeys: contextMenuVariantKeys,
  variantMap: {
  "inset": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, contextMenuVariantKeys)
  },
  getVariantProps
})