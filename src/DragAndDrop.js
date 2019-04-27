import {createUniqueToken} from './general'

const handleDragstart = e => {
  e.target.id = e.target.id || createUniqueToken()
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

const suscribe = dropZone => element => callback => {
  element.addEventListener('dragstart', handleDragstart)
  dropZone.addEventListener('dragover', handleDragover)
  dropZone.addEventListener('drop', handleDrop(callback))
}

const unsuscribe = dropZone => element => callback => {
  element.removeEventListener('dragstart', handleDragstart)
  dropZone.removeEventListener('dragover', handleDragover)
  dropZone.removeEventListener('drop', handleDrop(callback))
}

export default {
  suscribe,
  unsuscribe
}
