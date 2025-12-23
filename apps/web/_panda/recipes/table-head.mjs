import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableHeadFn = /* @__PURE__ */ createRecipe('tableHead', {}, [])

const tableHeadVariantMap = {}

const tableHeadVariantKeys = Object.keys(tableHeadVariantMap)

export const tableHead = /* @__PURE__ */ Object.assign(memo(tableHeadFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableHead',
  __getCompoundVariantCss__: tableHeadFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableHeadVariantKeys,
  variantMap: tableHeadVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableHeadVariantKeys)
  },
  getVariantProps: tableHeadFn.getVariantProps,
})