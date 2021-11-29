import bus from '../../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: true })
  }

  function close (payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: false })
  }

  function listen (fn) {
    bus.on(EVENT_NAME, fn)
  }

  function off (fn) {
    bus.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
