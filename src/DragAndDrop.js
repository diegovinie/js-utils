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

const suscribe = dropZone => callback => {
  dropZone.addEventListener('dragover', handleDragover)
  dropZone.addEventListener('drop', handleDrop(callback))

  return element => {
    element.addEventListener('dragstart', handleDragstart)
  }
}

const unsuscribe = dropZone => callback => {
  dropZone.removeEventListener('dragover', handleDragover)
  dropZone.removeEventListener('drop', handleDrop(callback))

  return element => {
    element.removeEventListener('dragstart', handleDragstart)
  }
}

export default {
  suscribe,
  unsuscribe
}
