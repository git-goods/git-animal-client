import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableBodyFn = /* @__PURE__ */ createRecipe('tableBody', {}, [])

const tableBodyVariantMap = {}

const tableBodyVariantKeys = Object.keys(tableBodyVariantMap)

export const tableBody = /* @__PURE__ */ Object.assign(memo(tableBodyFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableBody',
  __getCompoundVariantCss__: tableBodyFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableBodyVariantKeys,
  variantMap: tableBodyVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableBodyVariantKeys)
  },
  getVariantProps: tableBodyFn.getVariantProps,
})