import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableHeaderFn = /* @__PURE__ */ createRecipe('tableHeader', {}, [])

const tableHeaderVariantMap = {}

const tableHeaderVariantKeys = Object.keys(tableHeaderVariantMap)

export const tableHeader = /* @__PURE__ */ Object.assign(memo(tableHeaderFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableHeader',
  __getCompoundVariantCss__: tableHeaderFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableHeaderVariantKeys,
  variantMap: tableHeaderVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableHeaderVariantKeys)
  },
  getVariantProps: tableHeaderFn.getVariantProps,
})