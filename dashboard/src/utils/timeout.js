export function wait (timeMS) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMS)
  })
}
