import React from 'react'
import { render } from '@testing-library/react'
import { PageLoadingAnimation, PageLoadingAnimationProps } from '../page-loading-animation'
import { MediaName } from '@sample/utilities/media-query'

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('@sample/assets', () => {})

jest.mock('@sample/providers/media-query-provider', () => ({
  useMediaQuery: () => ({
    mediaQueryName: MediaName.Desktop,
  }),
}))

describe('PageLoadingAnimation', () => {
  let props: PageLoadingAnimationProps

  beforeEach(() => {
    props = {
      isLoading: false,
    }
  })

  describe('isLoading is false', () => {
    it('should not render the component', () => {
      const { queryByTestId } = render(<PageLoadingAnimation {...props} />)

      expect(queryByTestId('loading-indicator')).not.toBeInTheDocument()
    })
  })

  describe('isLoading is true', () => {
    beforeEach(() => {
      props.isLoading = true
    })

    it('should render the component', () => {
      const { getByTestId } = render(<PageLoadingAnimation {...props} />)

      expect(getByTestId('loading-indicator')).toBeVisible()
    })
  })

  describe('there is a title', () => {
    beforeEach(() => {
      props.title = 'This is a title'
      props.isLoading = true
    })

    it('should render the title', () => {
      const { getByText } = render(<PageLoadingAnimation {...props} />)

      expect(getByText('This is a title')).toBeVisible()
    })
  })
})
