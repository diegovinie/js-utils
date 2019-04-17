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
