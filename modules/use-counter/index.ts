import useValue, { UseValueType } from '../use-value'

type ReturnType = {
  /** Adds offet or new offset to the value and updates state */
  readonly increment: (newOffset?: number) => void
  /** Subtracts offet or new offset to the value and updates state */
  readonly decrement: (newOffset?: number) => void
}

type UseCounterOptionType = { min?: number, max?: number, offset?: number }

/**
 * useCounter
 *
 * @param initialValue Initial value
 * @param min Minumum value of counter
 * @param max Maximum value of counter
 * @param offset Offset
 */
const useCounter: UseValueType<number, ReturnType, UseCounterOptionType> = (initialValue = 0, options = {}) => {
  const { min = -Infinity, max = Infinity, offset = 1 } = options

  const [value, $value] = useValue(initialValue)
  const increment = (newOffset = offset) => $value.set(Math.max(Math.min(value + newOffset, max), min))
  const decrement = (newOffset = offset) => $value.set(Math.max(Math.min(value - newOffset, max), min))

  return [value, { ...$value, increment, decrement }]
}

export default useCounter