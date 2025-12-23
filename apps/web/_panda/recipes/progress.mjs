import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const progressDefaultVariants = {}
const progressCompoundVariants = []

const progressSlotNames = [
  [
    "root",
    "progress__root"
  ],
  [
    "indicator",
    "progress__indicator"
  ]
]
const progressSlotFns = /* @__PURE__ */ progressSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, progressDefaultVariants, getSlotCompoundVariant(progressCompoundVariants, slotName))])

const progressFn = memo((props = {}) => {
  return Object.fromEntries(progressSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const progressVariantKeys = []
const getVariantProps = (variants) => ({ ...progressDefaultVariants, ...compact(variants) })

export const progress = /* @__PURE__ */ Object.assign(progressFn, {
  __recipe__: false,
  __name__: 'progress',
  raw: (props) => props,
  variantKeys: progressVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, progressVariantKeys)
  },
  getVariantProps
})