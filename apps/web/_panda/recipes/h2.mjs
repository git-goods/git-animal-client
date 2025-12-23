import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h2Fn = /* @__PURE__ */ createRecipe('h2', {}, [])

const h2VariantMap = {}

const h2VariantKeys = Object.keys(h2VariantMap)

export const h2 = /* @__PURE__ */ Object.assign(memo(h2Fn.recipeFn), {
  __recipe__: true,
  __name__: 'h2',
  __getCompoundVariantCss__: h2Fn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: h2VariantKeys,
  variantMap: h2VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h2VariantKeys)
  },
  getVariantProps: h2Fn.getVariantProps,
})