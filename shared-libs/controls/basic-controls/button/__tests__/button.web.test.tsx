import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { Button } from '../button'
import { ButtonPropsWeb } from '../button-props'
import 'jest-styled-components'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('../../activity-indicator/activity-indicator.tsx')

describe('Button', () => {
  let props: ButtonPropsWeb

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      title: 'Test Button',
      buttonType: 'primary',
      buttonSize: 'large',
    }
  })

  describe('is clicked', () => {
    it('should call onClicked', () => {
      const { getByText } = render(<Button {...props} />)

      const button = getByText(props.title as string)
      fireEvent.click(button)

      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('is disabled', () => {
    beforeEach(() => {
      props.disabled = true
    })

    describe('is clicked', () => {
      it('should not call onClicked', () => {
        const { getByText } = render(<Button {...props} />)

        const button = getByText(props.title as string)
        fireEvent.click(button)

        expect(props.onClick).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('has a left icon', () => {
    describe('the icon is a LocalSVGSource', () => {
      beforeEach(() => {
        props.leftIcon = <div>Test SVG</div>
      })

      it('should render the icon', () => {
        const { getByText } = render(<Button {...props} />)

        expect(getByText('Test SVG')).toBeDefined()
      })
    })

    describe('the icon is a JSX Element', () => {
      beforeEach(() => {
        props.leftIcon = <div>Icon</div>
      })

      it('should render the icon', () => {
        const { getByText } = render(<Button {...props} />)

        expect(getByText('Icon')).toBeDefined()
      })
    })
  })

  describe('has a right icon', () => {
    beforeEach(() => {
      props.rightIcon = <div>Test SVG</div>
    })

    it('should render the icon', () => {
      const { getByText } = render(<Button {...props} />)

      expect(getByText('Test SVG')).toBeDefined()
    })
  })

  describe('has a subtitle', () => {
    beforeEach(() => {
      props.subtitle = 'subtitle'
    })

    it('should render the subtitle', () => {
      const { getByText } = render(<Button {...props} />)

      expect(getByText('subtitle')).toBeDefined()
    })
  })
})

describe('Button Snapshot Tests', () => {
  let props: ButtonPropsWeb
  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      title: 'test',
      buttonType: 'primary',
      buttonSize: 'large',
    }
  })

  describe('the button type is primary', () => {
    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is xlarge', () => {
      beforeEach(() => {
        props.buttonSize = 'xlarge'
        props.title = 'primary xlarge'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'primary small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is secondary', () => {
    beforeEach(() => {
      props.title = 'secondary'
      props.buttonType = 'secondary'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'secondary small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is selector', () => {
    beforeEach(() => {
      props.title = 'selector'
      props.buttonType = 'selector'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'selector small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is disabled', () => {
    beforeEach(() => {
      props.title = 'disabled'
      props.buttonType = 'disabled'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'disabled small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is disabled', () => {
    beforeEach(() => {
      props.title = 'disabled'
      props.buttonType = 'disabled'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'disabled small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is transparent', () => {
    beforeEach(() => {
      props.title = 'transparent'
      props.buttonType = 'transparent'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'transparent small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('the button type is danger', () => {
    beforeEach(() => {
      props.title = 'danger'
      props.buttonType = 'danger'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'danger small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('there is an icon', () => {
    beforeEach(() => {
      props.leftIcon = <div>Test SVG</div>
      props.title = 'svg primary'
    })

    describe('the button size is large', () => {
      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('the button size is small', () => {
      beforeEach(() => {
        props.buttonSize = 'small'
        props.title = 'svg primary small'
      })

      it('button creates properly', () => {
        const tree = renderer.create(<Button {...props} />)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('there is a subtitle', () => {
    beforeEach(() => {
      props.title = 'Test Text'
      props.accessibilityLabel = 'Test Subt Title'
    })

    it('button creates properly', () => {
      const tree = renderer.create(<Button {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('there is no side padding', () => {
    beforeEach(() => {
      props.title = 'no side padding'
      props.doNotApplySidePadding = true
    })

    it('button creates properly', () => {
      const tree = renderer.create(<Button {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('there is accessibility text', () => {
    beforeEach(() => {
      props.title = 'Test Text'
      props.accessibilityLabel = 'Accessibility text goes here'
    })

    it('button creates properly', () => {
      const tree = renderer.create(<Button {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })
})
