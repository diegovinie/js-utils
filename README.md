# Javascript utils

### Instalación
`npm install @diegovinie/js-utils`

### Uso básico
- Para las funciones (siempre en camelCase):
```js
import {flatMap, shuffle} from '@diegovinie/js-utils'

const colors = ['H', 'S', 'D', 'C']
const ranks = (new Array(13)).fill(null).map((_, p) => p + 1)

const createGroupColor = color => ranks.map(rank => ({ rank, color }))

const cards = flatMap(colors)(createGroupColor)

const shuffledCards = shuffle(cards)
```

- Para los módulos (siempre en capitals):
```js
import {DragAndDrop} from '@diegovinie/utils'

const dropZone = document.getElementById('discarted-cards')

const cardContainers = document.querySelectorAll('.card-container')

const discardCard = card => { card.remove() }

const suscribeDiscartedStack = DragAndDrop.suscribe(dropZone)(discardCard)


cardContainers.forEach(card => { suscribeDiscartedStack(card) })
```

### Pruebas unitarias
Las pruebas unitarias se realizan con *jest* corriendo `npm run test`
También con `npm run test-results` se levanta un servidor *localhost:3000* en el directorio con el reporte.

### Documentación
La documentación se genera con jsdoc usando el comando `npm run doc` el cual
creará un directorio `doc/` con páginas estáticas.

Aparentemente jsdoc aún no soporta la sintaxis es2015 para funciones.

*TODO*

correo de contacto [diego.viniegra@gmail.com](diego.viniegra@gmail.com)
