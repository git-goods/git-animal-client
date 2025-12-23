import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const listFn = /* @__PURE__ */ createRecipe('list', {}, [])

const listVariantMap = {}

const listVariantKeys = Object.keys(listVariantMap)

export const list = /* @__PURE__ */ Object.assign(memo(listFn.recipeFn), {
  __recipe__: true,
  __name__: 'list',
  __getCompoundVariantCss__: listFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: listVariantKeys,
  variantMap: listVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, listVariantKeys)
  },
  getVariantProps: listFn.getVariantProps,
})