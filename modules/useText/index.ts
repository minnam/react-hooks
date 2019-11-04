import useValue, { UseValueType } from '../useValue'

type UseTextReturnType = {
  /** Updates text to uppercase */
  readonly toUpperCase: () => void
  /** Updates text to lowercase */
  readonly toLowerCase: () => void
}

/**
 * useText
 *
 * Returns a stateful text value, and functions to interact with it
 *
 * @param initialValue Initial value
 */
const useText: UseValueType<string, UseTextReturnType> = (initialValue = '') => {
  const [value, $value] = useValue(initialValue)
  const toUpperCase = () => $value.set(value.toUpperCase())
  const toLowerCase = () => $value.set(value.toLowerCase())

  return [value, { ...$value, toUpperCase, toLowerCase }]
}

export default useText