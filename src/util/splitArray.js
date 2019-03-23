export function split (array, len) {
  var alen = array.length
  var result = []
  for (var i = 0; i < alen; i += len) {
    result.push(array.slice(i, i + len))
  }
  return result
}
