import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const formItemFn = /* @__PURE__ */ createRecipe('formItem', {}, [])

const formItemVariantMap = {}

const formItemVariantKeys = Object.keys(formItemVariantMap)

export const formItem = /* @__PURE__ */ Object.assign(memo(formItemFn.recipeFn), {
  __recipe__: true,
  __name__: 'formItem',
  __getCompoundVariantCss__: formItemFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: formItemVariantKeys,
  variantMap: formItemVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, formItemVariantKeys)
  },
  getVariantProps: formItemFn.getVariantProps,
})