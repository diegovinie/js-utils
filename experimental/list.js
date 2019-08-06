
const push = list => item => ({
  data: item,
  next: list
})

const fromArray = items => {
  const data = items[0]
  const tail = items.slice(1)
  
  return {
    data,
    next: tail.length > 0 ? fromArray(tail) : null
  }
}

const toArray = ({data, next}, arr=[]) => {
  arr.push(data)
  return next ? toArray(next, arr) : arr
}

const pop = list => [list.data, list.next]

const map = fn => ({data, next}) => ({
  data: fn(data),
  next: next ? map(fn)(next) : null
})

const filter = fn => ({data, next}) => fn(data)
  ? { data, next: next && filter(fn)(next) }
  : next && filter(fn)(next)

const concat = ({data, next}) => ys => ({
  data,
  next: next ? concat(next)(ys) : ys
})

const reverse = ({data, next}) =>
  next ? concat (reverse(next)) ({data}) : {data}

const range = length => ({
  data: length,
  next: length ? range(length - 1) : null
})

const take = num => ({data, next}) => num
  ? { data, next: take(num - 1)(next) }
  : null

const slice = index => list => index
  ? slice(index - 1)(list.next)
  : list

const List = {
  fromArray,
  toArray,
  push,
  pop,
  map,
  filter,
  concat,
  reverse,
  range,
  take,
  slice
}
