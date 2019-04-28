import {wrapText} from '../../../src/general'

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
