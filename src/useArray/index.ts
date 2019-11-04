import useValue, { UseValueReturnType } from '../useValue'

type ReturnType<Z> = {
  /** Adds new item and updates current state */
  readonly push: (value: Z) => void
  /** Removes last item and updates current state */
  readonly pop: () => Z
  /** Returns the size of array */
  readonly length: () => void
  /** Returns the size of array */
  readonly size: () => void
  /** Consolidates given array into current state */
  readonly update: (value: Z[]) => void
}
export type UseArrayType = <X>(initialValue?: X[]) => [X[], UseValueReturnType<X> & ReturnType<X>]

/**
 * useArray
 *
 * Returns a stateful array, and functions to interact with it
 */
const useArray:UseArrayType = (initialValue = []) => {
  const [value, $value] = useValue(initialValue)
  const update = <Z> (value: Z[]) => $value.set((prev: Z[]) => [ ...prev,  ...value ])
  const push = <Z> (item: Z) => {
    const items = [ ...value ]
    items.push(item)

    $value.set(items)
  }
  const pop = () => {
    const items = [ ...value ]
    const removedItem = items.pop

    $value.set(items)

    return removedItem
  }

  const size = () => value.length

  return [
    value,
    {
      ...$value,
      length: size,
      pop,
      push,
      size,
      update,
    }
  ]
}