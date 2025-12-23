import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const formMessageFn = /* @__PURE__ */ createRecipe('formMessage', {}, [])

const formMessageVariantMap = {}

const formMessageVariantKeys = Object.keys(formMessageVariantMap)

export const formMessage = /* @__PURE__ */ Object.assign(memo(formMessageFn.recipeFn), {
  __recipe__: true,
  __name__: 'formMessage',
  __getCompoundVariantCss__: formMessageFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: formMessageVariantKeys,
  variantMap: formMessageVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, formMessageVariantKeys)
  },
  getVariantProps: formMessageFn.getVariantProps,
})