# Funciones de general.js

## [wrapText](https://github.com/diegovinie/js-utils/blob/31e279dc2f884343cdd2f7d843ef16cca1267454/src/general.js#L11)
`wrapText = length => text => String`

Toma una cadena de texto *text* y la recorta en líneas de longitud mínima `integer` *length*,
introduciendo un caracter `\n`. Al llegar a la longitud *length* no corta la
palabra sino espera hasta encontrar el primer espacio en blanco.

Ejemplo:

```js
const fragment = 'El recién llegado marchó derecho a la mesa, se quedó en pie, tiró al azar sobre el tapete una moneda de oro que tenía en la mano, y que fue rodando, al negro; luego, a fuerza de corazón esforzado, que abomina de trapaceras incertidumbres, lanzó al tallador una mirada, entre turbulenta y tranquila.'

const wrapped = wrapText (16) (fragment)

/*
wrapped:

"El recién llegado
marchó derecho a
la mesa, se quedó
en pie, tiró al azar
sobre el tapete una
moneda de oro que
tenía en la mano,
y que fue rodando,
al negro; luego,
a fuerza de corazón
esforzado, que abomina
de trapaceras incertidumbres,
lanzó al tallador
una mirada, entre
nta y tranquila."
*/

const linesLength = wrapped.split('\n').map(line => line.length)
/*
linesLength:

(15) […]
0: 18
1: 17
2: 18
3: 21
4: 20
5: 18
6: 18
7: 19
8: 17
9: 20
10: 23
11: 30
12: 18
13: 18
14: 16
length: 15
<prototype>: Array []
*/

linesLength.some(len => len < 16) // false
```

## random
`random = max => Integer`

Devuelve un número entero aleatorio entre 0 y el `integer` *max* (no incluído).

Ejemplo:

```js
const random = random(5) // 2

Array(10).fill(7).map(random)
/*
Array(10) [ 1, 6, 0, 3, 1, 3, 5, 3, 1, 4 ]
*/

const hundredRandomNumbers = Array(100).fill(15).map(random)

const max = hundredRandomNumbers.reduce((max, num) => num > max ? num : max, 0)

const min = hundredRandomNumbers.reduce((min, num) => num < min ? num : min, 0)
/*
max: 14, min: 0
*/
```

## shuffle
`shuffle = originalItems => Array`

Devuelve un nuevo arreglo con sus elementos barajeados.
No modifica el `Array` *originalItems*.

Ejemplo:
```js
const cards = ['7', '8', '9', 'J', 'Q', 'K', 'A']

const shuffledCards = shuffle(cards)
/*
[
  "7",
  "8",
  "Q",
  "K",
  "A",
  "J",
  "9"
]
*/
```
