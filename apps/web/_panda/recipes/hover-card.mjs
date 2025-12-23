import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const hoverCardDefaultVariants = {}
const hoverCardCompoundVariants = []

const hoverCardSlotNames = [
  [
    "root",
    "hoverCard__root"
  ],
  [
    "trigger",
    "hoverCard__trigger"
  ],
  [
    "content",
    "hoverCard__content"
  ]
]
const hoverCardSlotFns = /* @__PURE__ */ hoverCardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, hoverCardDefaultVariants, getSlotCompoundVariant(hoverCardCompoundVariants, slotName))])

const hoverCardFn = memo((props = {}) => {
  return Object.fromEntries(hoverCardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const hoverCardVariantKeys = []
const getVariantProps = (variants) => ({ ...hoverCardDefaultVariants, ...compact(variants) })

export const hoverCard = /* @__PURE__ */ Object.assign(hoverCardFn, {
  __recipe__: false,
  __name__: 'hoverCard',
  raw: (props) => props,
  variantKeys: hoverCardVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, hoverCardVariantKeys)
  },
  getVariantProps
})