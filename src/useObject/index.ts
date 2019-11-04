import useValue, { UseValueReturnType } from '../useValue'

type ReturnType<Z> = {
  /** Updates value with overwritting previous value */
  update: (value: Z) => void
}
export type UseObjectType = <X extends object>(initialValue?: X) => [X, UseValueReturnType<X> & ReturnType<X>]

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