import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableFn = /* @__PURE__ */ createRecipe('table', {}, [])

const tableVariantMap = {}

const tableVariantKeys = Object.keys(tableVariantMap)

export const table = /* @__PURE__ */ Object.assign(memo(tableFn.recipeFn), {
  __recipe__: true,
  __name__: 'table',
  __getCompoundVariantCss__: tableFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableVariantKeys,
  variantMap: tableVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableVariantKeys)
  },
  getVariantProps: tableFn.getVariantProps,
})