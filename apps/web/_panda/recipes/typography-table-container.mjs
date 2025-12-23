import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const typographyTableContainerFn = /* @__PURE__ */ createRecipe('typographyTableContainer', {}, [])

const typographyTableContainerVariantMap = {}

const typographyTableContainerVariantKeys = Object.keys(typographyTableContainerVariantMap)

export const typographyTableContainer = /* @__PURE__ */ Object.assign(memo(typographyTableContainerFn.recipeFn), {
  __recipe__: true,
  __name__: 'typographyTableContainer',
  __getCompoundVariantCss__: typographyTableContainerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: typographyTableContainerVariantKeys,
  variantMap: typographyTableContainerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, typographyTableContainerVariantKeys)
  },
  getVariantProps: typographyTableContainerFn.getVariantProps,
})