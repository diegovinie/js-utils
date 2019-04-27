/**
 * Vuelve a lanzar una copia del evento de teclado.
 *
 * @param {Event} e se espera un evento de teclado.
 */
const forwardKeyboardEvents = e => {
  const attributes = {
    code:     e.code,
    keyCode:  e.keyCode,
    charCode: e.charCode
  }

  const evt = new KeyboardEvent(e.type, attributes)

  document.dispatchEvent(evt)
}

/**
 * Captura los eventos para pasarlos al iframe.
 *
 * @uses {Function} forwardKeyboardEvents
 *
 * @param {Window} scope expects to be the parent.
 */
const captureEvents = scope => {
  scope.addEventListener('keypress', forwardKeyboardEvents)
  scope.addEventListener('keydown', forwardKeyboardEvents)
  scope.addEventListener('keyup', forwardKeyboardEvents)
}

/**
 * Detiene la captura de eventos en el padre.
 *
 * Se debe disparar al terminar la ejecución en el iframe para evitar
 * eventos zoombies.
 *
 * @uses {Function} forwardKeyboardEvents
 *
 * @param {Window} scope expects to be the parent.
 */
const releaseCapturedEvents = scope => () => {
  scope.removeEventListener('keypress', forwardKeyboardEvents)
  scope.removeEventListener('keydown', forwardKeyboardEvents)
  scope.removeEventListener('keyup', forwardKeyboardEvents)
}

/**
 * Pasa los eventos del teclado hacia el iframe donde es llamada.
 *
 * Útil cuando se embeben juegos que requieren teclado dentro de un iframe.
 *
 * @uses {Function} captureEvents
 * @uses {Function} releaseCapturedEvents
 */
export const forwardParentKeyboardEvents = () => {
  const hasParent = !(parent === window)

  if (hasParent) {
    window.finishedEvent = new Event('finished')

    captureEvents(parent)
    window.addEventListener('finished', releaseCapturedEvents(parent))
  }
}
