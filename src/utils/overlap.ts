/**
 * Find values that intersects between two array and returns them
 *
 * @param array1
 * @param array2
 */
export const overlap = (array1: string[], array2: string[]) => {
  return array1.filter(item => {
    return array2.indexOf(item) > -1
  })
}