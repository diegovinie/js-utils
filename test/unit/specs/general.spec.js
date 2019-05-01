import {
  wrapText,
  random,
  shuffle,
  shuffleHtmlList,
  quicksort,
  mapSort
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
  it.skip('should have same items', () => {

  })

  it.skip('should be ordered', () => {

  })
})
