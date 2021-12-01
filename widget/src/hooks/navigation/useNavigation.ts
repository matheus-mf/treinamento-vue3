import { setCurrentComponent, setFeedbackType } from '@/store'
import useStore from '../store'
import { INavigation } from './types'

export function useNavigation (): INavigation {
  const store = useStore()

  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setFeedbackType('')
    }
  }

  function setErrorState (): void {
    setCurrentComponent('Error')
  }

  function setSuccessState (): void {
    setCurrentComponent('Success')
  }

  return {
    next,
    back,
    setErrorState,
    setSuccessState
  }
}
