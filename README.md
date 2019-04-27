# Javascript utils

### Instalación
`npm install https://github.com/diegovinie/js-utils.git`

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

*TODO*

correo de contacto [diego.viniegra@gmail.com](diego.viniegra@gmail.com)
