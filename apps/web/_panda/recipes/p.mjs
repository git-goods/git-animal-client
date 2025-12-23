import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const pFn = /* @__PURE__ */ createRecipe('p', {}, [])

const pVariantMap = {}

const pVariantKeys = Object.keys(pVariantMap)

export const p = /* @__PURE__ */ Object.assign(memo(pFn.recipeFn), {
  __recipe__: true,
  __name__: 'p',
  __getCompoundVariantCss__: pFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: pVariantKeys,
  variantMap: pVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, pVariantKeys)
  },
  getVariantProps: pFn.getVariantProps,
})