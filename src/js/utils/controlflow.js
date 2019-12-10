const conditionalDefaultValue (condition, value, default) {
  if (condition) { return default }
  return value
}
