import {
  wrapText,
  random,
  shuffle,
  shuffleHtmlList
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
