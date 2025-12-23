import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const inlineCodeFn = /* @__PURE__ */ createRecipe('inlineCode', {}, [])

const inlineCodeVariantMap = {}

const inlineCodeVariantKeys = Object.keys(inlineCodeVariantMap)

export const inlineCode = /* @__PURE__ */ Object.assign(memo(inlineCodeFn.recipeFn), {
  __recipe__: true,
  __name__: 'inlineCode',
  __getCompoundVariantCss__: inlineCodeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: inlineCodeVariantKeys,
  variantMap: inlineCodeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, inlineCodeVariantKeys)
  },
  getVariantProps: inlineCodeFn.getVariantProps,
})