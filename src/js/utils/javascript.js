export const defaultdict = defaultVal => {
  const dict = {}
  dict.get = k => {
    if (!(k in dict)) {
      dict[k] = defaultVal(k)
    }
    return dict[k]
  }

  dict.size = () => {
    return Object.keys(dict).length
  }

  return dict
}

export const pairwise = array => {
  const pairs = []
  let i = 0
  while (i < array.length) {
    pairs.push(array.slice(i, i + 2))
    i += 2
  }
  return pairs
}

export const NO_OP = () => {}


// https://gist.github.com/gordonbrander/2230317
export const randomID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}