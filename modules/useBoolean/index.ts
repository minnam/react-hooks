import useValue, { UseValueType } from '../useValue'

type ReturnType = {
  /** Sets current value to the opposite */
  readonly toggle: () => void
}

/**
 * useBoolean
 *
 * Returns a stateful boolean value, and functions to interact with it
 *
 * @param initialValue Initial value
 */
const useBoolean: UseValueType<boolean, ReturnType> = (initialValue = false)  => {
  const [value, $value] = useValue(initialValue)
  const toggle = () => $value.set(!value)

  return [value, { ...$value, toggle  }]
}

export default useBoolean