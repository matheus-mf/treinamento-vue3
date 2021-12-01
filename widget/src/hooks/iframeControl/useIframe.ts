import { setApiKey, setCurrentPage, setFingerprint } from '@/store'
import { IIframeControl } from './types'

export function useIframeControl ():IIframeControl {
  function updateCoreValuesOnStore (): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apiKey = query.get('api_key') || ''
      const page = query.get('page') || ''
      const fingerprint = query.get('fingerprint') || ''

      setApiKey(apiKey)
      setCurrentPage(page)
      setFingerprint(fingerprint)
      return
    }
    setApiKey('api_key_test')
    setCurrentPage('https://playground-url.com')
    setFingerprint('fingerprint_test')
  }

  function notifyOpen (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  function notifyClose (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: false
    }, '*')
  }

  return {
    updateCoreValuesOnStore,
    notifyOpen,
    notifyClose
  }
}
