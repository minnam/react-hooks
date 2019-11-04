import axios from 'axios'
import useObject, { UseObjectReturnType } from '../useObject'

type UseAxiosStateType = { loading: boolean, error?: Error, data?: unknown }

const generateCallback = (params: { url: string, $state: UseObjectReturnType<UseAxiosStateType>, callback: any}) => {
  const { url, $state, callback } = params
  return async (_ = {}) => {
    $state.update({ loading: true })
    try {
      const response = await callback(url, _)

      $state.update({
        data: response.data,
        loading: false
      })
    } catch (error) {
      $state.update({
        loading: false,
        error
      })
    }
  }
}

const get = async (url: string, options = {}) => await axios.get(url, options)
const remove = async (url: string, options = {}) => await axios.delete(url, options)
const head = async (url: string, options = {}) => await axios.head(url, options)
const post = async (url: string, data: {} = {}, options = {}) => await axios.post(url, data, options)
const put = async (url: string, data: {} = {}, options = {}) => await axios.put(url, data, options)
const patch = async (url: string, data: {} = {}, options = {}) => await axios.patch(url, data, options)

const INITIAL_STATE = {
  loading: false,
  error: undefined,
  data: undefined
}

const useAxios = (url: string) => {
  const [state, $state] = useObject<UseAxiosStateType>(INITIAL_STATE)

  return [
    state,
    {
      get: generateCallback({ url, $state, callback: get }),
      delete: generateCallback({ url, $state, callback: remove }),
      head: generateCallback({ url, $state, callback: head }),
      post: generateCallback({ url, $state, callback: post }),
      put: generateCallback({ url, $state, callback: put }),
      patch: generateCallback({ url, $state, callback: patch }),
    }
  ]
}

export default useAxios