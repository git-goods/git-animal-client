import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const h1Fn = /* @__PURE__ */ createRecipe('h1', {}, [])

const h1VariantMap = {}

const h1VariantKeys = Object.keys(h1VariantMap)

export const h1 = /* @__PURE__ */ Object.assign(memo(h1Fn.recipeFn), {
  __recipe__: true,
  __name__: 'h1',
  __getCompoundVariantCss__: h1Fn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: h1VariantKeys,
  variantMap: h1VariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, h1VariantKeys)
  },
  getVariantProps: h1Fn.getVariantProps,
})