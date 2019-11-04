import useValue, { UseValueReturnType } from '../useValue'

export type UseObjectReturnType<X>  = UseValueReturnType<X> & {
  /** Updates value with overwritting previous value */
  readonly update: (value: X) => void,
}
export type UseObjectType = <X extends object>(initialValue?: X) => [X, UseObjectReturnType<X>]

/**
 * useObject
 *
 * Returns a stateful object, and functions to interact with it
 */
const useObject:UseObjectType = (initialValue) => {
  const [value, $value] = useValue (initialValue)
  const update = <Z> (value: Z) => { $value.set((prev: Z) => ({ ...prev,  ...value })) }

  return [
    value,
    {
      ...$value,
      update,
    }
  ]
}

export default useObject