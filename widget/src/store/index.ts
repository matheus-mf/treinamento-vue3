import { reactive, readonly } from 'vue'

export type TStoreState = {
  currentComponent: 'SelectFeedbackType' | 'WriteAFeedback' | 'Success' | 'Error'
  message: string
  feedbackType: '' | 'ISSUE' | 'IDEA' | 'OTHER'
  fingerprint: string
  apiKey: string
  currentPage: string
}

const initialState:TStoreState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<TStoreState>({ ...initialState })

export function setCurrentComponent (component: TStoreState['currentComponent']): void {
  state.currentComponent = component
}

export function setMessage (message: string): void {
  state.message = message
}

export function setFeedbackType (feedbackType: TStoreState['feedbackType']): void {
  state.feedbackType = feedbackType
}

export function setFingerprint (fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function setApiKey (apiKey: string): void {
  state.apiKey = apiKey
}

export function setCurrentPage (currentPage: string): void {
  state.currentPage = currentPage
}

export function resetStore (): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setFeedbackType(initialState.feedbackType)
  setFingerprint(initialState.fingerprint)
  setApiKey(initialState.apiKey)
  setCurrentPage(initialState.currentPage)
}

export default readonly(state)
