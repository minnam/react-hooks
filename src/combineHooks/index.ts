/** Utils ======================================================================================= */
import { overlap } from '../utils/overlap'

interface combinedHooksType {
  (hooks: any []): {[key: string]: (...args: any[]) => {}}
}
/** combineHooks ================================================================================ */
const combineHooks: combinedHooksType = (hooks) => {
  const hooksCopy = [...hooks]
  const combinedHooks: {[key: string]: any} = {}

  /** Overlapped key values between hooks */
  let keys = overlap(Object.keys(hooks.pop()), Object.keys(hooks.pop()))

  while (hooks.length > 0) {
    keys = overlap(keys, Object.keys(hooks.pop()))
  }

  /** Combining overlapped hooks to a single callback */
  keys.map((key: string) => {
    combinedHooks[key] = () => {
      hooksCopy.map(hook => {
        hook[key]()
      })
    }
  })

  return combinedHooks
}

export default combineHooks