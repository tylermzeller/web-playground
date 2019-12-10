import * as controlUtils from './controlflow.js'
import * as strUtils from './string.js'

export const makeConditionalSetter = (cond, obj, attr, value, default) => {
  obj[attr] = controlUtils.conditionalDefaultValue(cond, value, default)
}

export const defaultStringSetter = (obj, attr, value, default) => {
  if (!strUtils.isString(value) && strUtils.isString(default)) {
    value = default
  } else {
    throw `Can't set ${value} to ${attr}`
  }
  obj[attr] = value
}
