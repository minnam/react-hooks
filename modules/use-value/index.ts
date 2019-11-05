import { useState } from 'react'

export type UseValueReturnType<X> = {
  /** Updates current value. (Identical to setValue) */
  readonly set: React.Dispatch<X>,
  /** Updates current value. (Identical to set)  */
  readonly setValue: React.Dispatch<X>,
  /** Resets current value to `initialValue` */
  readonly reset: () => void
}

export type UseValueType<X, Y, Z = {}> = (initialValue?: X, options?: Z) => [X, UseValueReturnType<X> & Y]

/**
 * useValue
 *
 * Returns a stateful value, and functions to interact with it
 *
 * @param initialValue Initial value
 */
const useValue: (UseValueType<any, UseValueReturnType<any>>) = (initialValue, ion) => {
  const [value, set] = useState(initialValue)
  const reset = () => set(initialValue)

  return [value, { set, setValue: set, reset }]
}

export default useValue