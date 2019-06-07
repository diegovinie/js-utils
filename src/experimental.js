const oneAndLefties = (one, p, numbers) => [one, numbers.slice(0, p)]

const findMax = (acc, n) => n > acc ? n : acc

const diffOneAndNumbers = ([one, numbers]) =>
  numbers.filter(n => one > n).map(n => one - n).reduce(findMax, -1)

const maxDiff = numbers =>
  numbers.map(oneAndLefties).map(diffOneAndNumbers).reduce(findMax, -1)

function maxDiffOriginal (arr) {
    // return Array[integer, Array[interger]] number & the list of left wing
    function lefties(num, p, ar) { return [num, ar.slice(0, p)] }

    function findMax(acc, n) { return n > acc ? n : acc }

    // returns Array[integer] diffs
    function diffNumArray([num, ar]) {
        const smallers = ar.filter(function (n) { return num > n })

        // console.log(num, arr, smallers)
        if (smallers.length <= 0) return -1;

        return smallers
            .map(function (n) { return num - n })
            .reduce(findMax, 0)
    }

    const diffs = arr.map(lefties).map(diffNumArray)

    if (diffs.every(function (n) { return n === -1 })) return -1

    return diffs.reduce(findMax, 0)
}

class Model {
  defaults = {}

  _events = {
    change: details =>
      dispatchEvent(new CustomEvent('change', { details }))
  }

  constructor (props) {
    this.attributes = { ...this.defaults, ...props }
    this._prevAttrs = {}

    this._attrs = new Proxy(
      this.attributes,
      this._proxyHandler(this._callback)
    )
  }

  get = attr => this._attrs[attr]

  set = attrs => {
    this._prevAttrs = { ...this.attributes }

    Object.entries(attrs).forEach(([k, v]) => {
      this._attrs[k] = v
    })
    return this
  }

  toJSON = () => JSON.stringify(this.attributes)

  _proxyHandler = callback => ({
    set: function (obj, prop, val) {

      const prev = obj[prop]
      obj[prop] = val
      callback(arguments)
      this._events.change({prev, val})
      return true
    }.bind(this),

    get: function (obj, prop) {
      console.log('getted', prop)
      callback(arguments)
      return obj[prop]
    }.bind(this)
  })

  _callback = (...args) => console.log(args)
}
