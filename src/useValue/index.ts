import { useState } from 'react'

export type UseValueReturnType<T> = {
  /** Updates current value. (Identical to setValue) */
  readonly set: React.Dispatch<T>,
  /** Updates current value. (Identical to set)  */
  readonly setValue: React.Dispatch<T>,
  /** Resets current value to `initialValue` */
  readonly reset: () => void
}
export type UseValueType<X, Y> = (initialValue?: X) => [X, UseValueReturnType<X> & Y]

/**
 * useValue
 *
 * Returns a stateful value, and functions to interact with it
 *
 * @param initialValue Initial value
 */
const useValue: (UseValueType<any, any>) = (initialValue) => {
  const [value, set] = useState(initialValue)
  const reset = () => set(initialValue)

  return [value, { set, setValue: set, reset }]
}

export default useValue