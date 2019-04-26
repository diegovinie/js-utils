/**
 * Devuelve un string dividido por saltos de línea.
 *
 * No corta la palabra, sino continua hasta encontrar un espacio.
 *
 * @param {integer} length la longitud mínima de cada tramo.
 * @param {string} text el texto.
 *
 * @return {string} el texto dividido en líneas.
 */
export const wrapText = length => text =>
  text.match(new RegExp(`(?:.{${length}}.*?\\s|.{1,${length}}?$)`, 'g'))
    .join('\n')

/**
 * Devuelve un número aleatorio entre 0 y max (no incluído).
 *
 * @param {integer} max número tope.
 *
 * @return {integer} número aleatorio.
 */
export const random = max => Math.floor(Math.random() * max)

/**
 * Devuelve un nuevo array barajeado.
 *
 * @uses {Function} random
 *
 * @param {Array} originalItems array de entrada.
 *
 * @return {Array} array barajeado.
 */
export const shuffle = originalItems => {
  let gItems = Array.from(originalItems)

  const pick = index => {
    const item = gItems.find((_, p) => p === index)
    gItems = gItems.filter((_, p) => p !== index)

    return item
  }

  const shuffled = []

  while (gItems.length > 0) {
    shuffled.push(
      pick(random(gItems.length))
    )
  }

  return shuffled
}

/**
 * Barajea una lista de elementos HTML.
 *
 * @uses {Function} random
 *
 * @param {HTMLElement} htmlListElement lista ejem. <ul>.
 */
export const shuffleHtmlList = htmlListElement => {
  let gItems = Array.from(htmlListElement.children);

  const pick = index => {
    const item = gItems.find((_, p) => p === index)
    gItems = gItems.filter((_, p) => p !== index)

    return item
  }

  htmlListElement.innerHTML = ''

  while (gItems.length > 0) {
    htmlListElement.append(
      pick(random(gItems.length))
    )
  }
}

/**
 * Devuelve un nuevo array ordenado. Inspirado en haskell.
 *
 * @param {Array} items ordenables.
 *
 * @return {Array} ordenado.
 */
export const quicksort = items => {
  if (items.length == 0) return []

  const [head, ...tail] = items

  return [
    ...quicksort(tail.filter(i => i <= head)),
    head,
    ...quicksort(tail.filter(i => i > head))
  ]
}

/**
 * Devuelve un nuevo array ordenado según una función.
 *
 * @param {Function} mapper para buscar algo que pueda ser ordenado.
 * @param {Array} items
 *
 * @return {Array} ordenado.
 */
export const mapSort = mapper => items => {
  if (items.length == 0) return []

  const [head, ...tail] = items

  return [
    ...mapSort(mapper)(tail.filter(i => mapper(i) <= mapper(head))),
    head,
    ...mapSort(mapper)(tail.filter(i => mapper(i) > mapper(head)))
  ]
}

/**
 * Evita la repetición del evento.
 *
 * @param {Function} callback
 * @param {Array} args
 *
 * @return {Function|null}
 */
export const debounce = callback => {
  const timeout = 300
  var busy = false

  return (...args) => {
    if (busy) return null
    busy = true
    setTimeout(() => { busy = false }, timeout)

    return callback(...args)
  }
}

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

/**
 * Devuelve un string único (o intenta serlo).
 *
 * @author pimvdb at stackoverflow.com
 * @param {string} tag
 * @return {string}
 */
const createUniqueToken = tag => (tag || '') + Math.random().toString(36).substr(2)

const handleDragstart = e => {
  e.target.id = createUniqueToken()
  e.dataTransfer.setData('id', e.target.id)
  console.log(e.dataTransfer)
}

const handleDragover = e => {
  e.preventDefault()
  console.log('dragover')
}

const handleDrop = callback => e => {
  const id = e.dataTransfer.getData('id')
  const el = document.getElementById(id)
  console.log(id, el, e)

  return callback(el)
}

const suscribeDragAndDrop = container => element => callback => {
  element.addEventListener('dragstart', handleDragstart)
  container.addEventListener('dragover', handleDragover)
  container.addEventListener('drop', handleDrop(callback))
}

const unsuscribeDragAndDrop = container => element => callback => {
  element.removeEventListener('dragstart', handleDragstart)
  container.removeEventListener('dragover', handleDragover)
  container.removeEventListener('drop', handleDrop(callback))
}
