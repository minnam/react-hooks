import useValue, { UseValueReturnType } from '../use-value'

type UseArrayReturnType<X> = UseValueReturnType<X> & {
  /** Adds new item and updates current state */
  readonly push: (item: X) => void
  /** Removes last item and updates current state */
  readonly pop: () => X
  /** Returns the size of array */
  readonly length: () => void
  /** Consolidates given array into current state */
  readonly update: (value: X[]) => void
}
export type UseArrayType = <X>(initialValue?: X[]) => [X[], UseArrayReturnType<X>]

/**
 * useArray
 *
 * Returns a stateful array, and functions to interact with it
 */
const useArray: UseArrayType = (initialValue = []) => {
  const [value, $value] = useValue(initialValue)

  return [
    value,
    {
      ...$value,
      length: () => value.length,
      pop: () => {
        const items = [ ...value ]
        const removedItem = items.pop()

        $value.set(items)

        return removedItem
      },
      push: (item) => {
        const items = [ ...value ]
        items.push(item)

        $value.set(items)
      },
      update: (value) => $value.set((prev: []) => [ ...prev,  ...value ]),
    }
  ]
}

export default useArray