import {
  wrapText,
  random,
  shuffle,
  shuffleHtmlList,
  quicksort,
  mapSort,
  reverseString,
  checkPalindrome,
  createUniqueToken,
  compose,
  curryIt,
  curry,
  takeUniques
} from '../../../src/general'

describe('wrapText', () => {
  const text = 'Esto es un texto para probar que divide con saltos de línea.'
  const textWrapped = wrapText(12)(text)

  it('should be a string', () => {
    expect(typeof textWrapped).toEqual('string')
  })

  it('should have line breaks', () => {
    expect(textWrapped).toEqual(
      expect.stringMatching('\n')
    )
  })
})

describe('random', () => {
  const max = 1
  const result = random(max)

  it('should be integer', () => {
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should be lesser than ' + max, () => {
    expect(result).toBeLessThan(max)
  })
})

describe('shuffle', () => {
  const trueIfDiffIndex = items => (acc, i, p) => items[p] !== i ? true : acc

  const items = [
    { rank: 1, name: 'A' },
    { rank: 2, name: 'B' },
    { rank: 3, name: 'C' },
    { rank: 4, name: 'D' },
    { rank: 5, name: 'E' },
    { rank: 6, name: 'F' },
    { rank: 7, name: 'G' },
    { rank: 8, name: 'H' },
    { rank: 9, name: 'I' },
  ]

  const oneItemList = [{a: ''}]

  const shuffled = shuffle(items)

  const oneShuffled = shuffle(oneItemList)

  it('should have same items', () => {
    expect(items.includes(...shuffled) && shuffled.includes(...items))
      .toBe(true)
  })

  it('One length array should be the same', () => {

    const shouldBeFalse = oneItemList.reduce(trueIfDiffIndex(oneShuffled), false)

    expect(shouldBeFalse).toBe(false)
  })

  it('should have different order', () => {
    const atLeastOneDiff = shuffled.reduce(trueIfDiffIndex(items), false)

    expect(atLeastOneDiff).toBe(true)
  })
})

describe('shuffleHtmlList', () => {
  it.skip('should have same items', () => {

  })

  it.skip('should have different order', () => {

  })
})

describe('quicksort', () => {
  const numbers = [7, 23, 5, 1, 18, 14, 20, -2, 0, 12]
  const alpha = ['4', 'b', 're', 'a', 'z', '12']
  const repeated = [4, 2, 4, 7, 3, 10, 2, 4, 0]

  const orderedNumbers = quicksort(numbers)
  const orderedAlpha = quicksort(alpha)
  const orderedRepeated = quicksort(repeated)

  it('numbers should be ordered', () => {
    expect(orderedNumbers).toEqual([-2, 0, 1, 5, 7, 12, 14, 18, 20, 23])
  })

  it('alphanumeric should be ordered', () => {
    expect(orderedAlpha).toEqual(["12", "4", "a", "b", "re", "z"])
  })

  it('repeated should be ordered', () => {
    expect(orderedRepeated).toEqual([0, 2, 2, 3, 4, 4, 4, 7, 10])
  })
})

describe('mapSort', () => {
  const items = [
    {
      order: 3,
      name: 'c'
    },
    {
      order: 9,
      name: 'c'
    },
    {
      order: 0,
      name: '0'
    },
    {
      order: 5,
      name: 'e'
    },
    {
      order: 6,
      name: 'f'
    },
    {
      order: 2,
      name: 'b'
    },
    {
      order: 3,
      name: 'c'
    }
  ]

  const orderBy = item => item.order

  const ordered = mapSort(orderBy)(items)

  it('should have same items', () => {
    const one = items.map(i => ordered.includes(i))
    const two = ordered.map(o => items.includes(o))

    expect(one).toEqual(two)
  })

  it('should be ordered', () => {
    const orderedIndexes = ordered.map(orderBy)

    expect(orderedIndexes).toEqual([0, 2, 3, 3, 5, 6, 9])
  })
})

describe('reverseString', () => {
  const text = "La última vez que te vi terminé bastante mal"

  it('double reverse should be the same', () => {
    const reversed = reverseString(text)
    const doubleReversed = reverseString(reversed)

    expect(doubleReversed).toBe(text)
  })
})

describe('checkPalindrome', () => {
  it('should be a palindrome', () => {
    const text = 'Able was I ere I saw Elba'
    const isPal = checkPalindrome(text)

    expect(isPal).toBe(true)
  })

  it('should not be a palindrome', () => {
    const text = 'ddoie d soi s ás spd'
    const isPal = checkPalindrome(text)

    expect(isPal).toBe(false)
  })
})

describe('createUniqueToken', () => {
  it('should be a string', () => {
    const token = createUniqueToken()

    expect(typeof token).toBe('string')
  })

  it('should be tagged', () => {
    const tag = 'foo'
    const token = createUniqueToken(tag)

    expect(token).toEqual(
      expect.stringMatching(`^${tag}`)
    )
  })
})

describe('compose', () => {
  const toUppercase = string => string.toUpperCase()

  it('should compose three functions', () => {
    const res = compose(toUppercase, reverseString, createUniqueToken)('bar-')
    expect(res).toEqual(
      expect.stringMatching(/[^a-z]-RAB$/)
    )
  })

  it('should return same nested and composed', () => {
    const input = 23943
    const sum = a => b => a + b
    const mult = a => b => a * b
    const toBinary = num => num.toString(2)

    const composed = compose (toBinary, mult(7), sum(90)) (input)
    const nested = toBinary(mult(7)(sum(90)(input)))

    expect(composed).toBe(nested)
  })
})

describe('curry', () => {
  const promOf5 = (a, b, c, d, e) => (a + b + c + d + e) / 5

  const curriedPromOf5 = curry(promOf5)
  const total = promOf5(5, 40, 300, 2000, 10000)

  it('should take args each time', () => {
    expect(curriedPromOf5(5)(40)(300)(2000)(10000)).toBe(total)
  })

  it('should take singles or grouped args', () => {
    expect(curriedPromOf5(40, 5)(10000)(300, 2000)).toBe(total)
  })

  it('partial args list should return a function', () => {
    expect(typeof curriedPromOf5(1, 2, 3, 4)).toBe('function')
  })
})

describe('takeUniques', () => {
  const items = [
    {a: 1},
    {a: 2},
    {a: 1},
    {a: 2},
    {a: 4},
    {a: 8}
  ]

  it('shoud have uniques', () => {
    const uniques = takeUniques(o => i => o.a === i.a)(items)

    expect(uniques.length).toBe([...new Set(items.map(i => i.a))].length)
  })
})
