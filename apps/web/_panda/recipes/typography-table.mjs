import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const typographyTableFn = /* @__PURE__ */ createRecipe('typographyTable', {}, [])

const typographyTableVariantMap = {}

const typographyTableVariantKeys = Object.keys(typographyTableVariantMap)

export const typographyTable = /* @__PURE__ */ Object.assign(memo(typographyTableFn.recipeFn), {
  __recipe__: true,
  __name__: 'typographyTable',
  __getCompoundVariantCss__: typographyTableFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: typographyTableVariantKeys,
  variantMap: typographyTableVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, typographyTableVariantKeys)
  },
  getVariantProps: typographyTableFn.getVariantProps,
})