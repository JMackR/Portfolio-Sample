import { urlFromString } from '../url'

describe('Url Functionality Tests', () => {
  test('parses correctly', () => {
    const urlString = 'https://foo.com?hype=sweet&abc=def&bool=true'
    const url = urlFromString(urlString)
    expect(url).toEqual({
      protocol: 'https:',
      hostname: 'foo.com',
      pathname: '/',
      queryParams: {
        hype: 'sweet',
        abc: 'def',
        bool: 'true',
      },
      fromString: urlString,
    })
  })
})
