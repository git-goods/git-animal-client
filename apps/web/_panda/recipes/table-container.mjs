import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableContainerFn = /* @__PURE__ */ createRecipe('tableContainer', {}, [])

const tableContainerVariantMap = {}

const tableContainerVariantKeys = Object.keys(tableContainerVariantMap)

export const tableContainer = /* @__PURE__ */ Object.assign(memo(tableContainerFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableContainer',
  __getCompoundVariantCss__: tableContainerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableContainerVariantKeys,
  variantMap: tableContainerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableContainerVariantKeys)
  },
  getVariantProps: tableContainerFn.getVariantProps,
})