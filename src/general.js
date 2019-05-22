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
  if (items.length === 0) return []

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
 * Devuelve un string único (o intenta serlo).
 *
 * @author pimvdb at stackoverflow.com
 * @param {string} tag
 * @return {string}
 */
export const createUniqueToken = tag => (tag || '') + Math.random().toString(36).substr(2)

/**
 * Voltea una cadena de texto.
 *
 * @param {string} stmt la cadena de texto.
 * @return {string}
 */
export const reverseString = stmt =>
  stmt.split('').map((_, i, ls) => ls[ls.length - 1 - i]).join('')

/**
 * Comprueba si una cadena es palíndrome.
 *
 * @uses {Function} reverseString
 * @param {string} stmt la cadena de texto.
 * @return {Boolean}
 */
export const checkPalindrome = stmt =>
  stmt.toLowerCase() === reverseString(stmt).toLowerCase()

/**
 * Compone funciones estilo f.g x = g(f(x))
 *
 * @example compose (fn4, fn3, fn2, fn1) (arg) === fn4(fn3(fn2(fn1(arg))))
 *
 * @param {Array[Function]} fns arreglo de funciones pasadas por parámetros.
 * @param arg parámetro de entrada.
 *
 * @return el retorno de función más a la izquierda.
 */
export const compose = (...fns) => arg =>
  fns.reverse().reduce((acc, fn) => fn(acc), arg)

/**
 * Currifica una función.
 *
 * @example var sum = (a, b) => a + b;
 *          var curriedSum = curryIt(sum);
 *          curriedSum(2)(3) // 5
 * limitaciones:
 *   Realmente no es una función currificada sino un objeto que simula
 *   la curryficación, por tanto tiene efectos laterales.
 *
 * @param {Function} fn la función que acepta varios parámetros.
 */
export const curryIt = fn => {
  // crea un objecto que captura argumentos
  function Curryfied (fun) {
    const args = []

    return captureArg = arg => {
      args.push(arg)
      // si los argumentos están completos retorna la función ejecutada
      return (args.length < fun.length) ? captureArg : fun(...args.splice(0))
    }
  }

  return new Curryfied(fn)
}

/**
 * @author Stefan Maric @stefanmaric
 */
export const curry = f => (...args) =>
  args.length < f.length ? curry(f.bind(null, ...args)) : f(...args)

/**
 * Para ser usado en pliegues. Si la comparación es false concatena.
 *
 * @param {Function} comparator toma 2 parámetros y devuelve Boolean.
 * @param {Array} acc el array acumulador.
 * @param {mixed} item
 * @return {Array}
 */
export const reduceUniques = comparator => (acc, item) =>
        acc.some(comparator(item)) ? acc : acc.concat(item)

// example
const comparerExample = original => item => original.a === item.a

/**
 * Devuelve elementos que son únicos al ser equiparados con una función.
 *
 * @param {Function} comparator toma dos parámetros y devuelve Boolean.
 * @param {Array} items arreglo a ser filtrado.
 * @return {Array}
 */
export const takeUniques = comparator => items =>
  items.reduce(reduceUniques(comparator), [])
