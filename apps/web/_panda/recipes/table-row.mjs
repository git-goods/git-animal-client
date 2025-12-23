import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableRowFn = /* @__PURE__ */ createRecipe('tableRow', {}, [])

const tableRowVariantMap = {}

const tableRowVariantKeys = Object.keys(tableRowVariantMap)

export const tableRow = /* @__PURE__ */ Object.assign(memo(tableRowFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableRow',
  __getCompoundVariantCss__: tableRowFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableRowVariantKeys,
  variantMap: tableRowVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableRowVariantKeys)
  },
  getVariantProps: tableRowFn.getVariantProps,
})