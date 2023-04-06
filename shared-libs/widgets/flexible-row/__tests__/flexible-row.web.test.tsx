import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { FlexibleRow } from '../flexible-row'
import { FlexibleRowProps, FlexibleMainContentRow, FlexibleSubContentRow } from '../flexible-row-props'
import { LocalSVGSource, ToggleProps } from '@sample/basic-controls'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('@sample/assets', () => ({
  ActionClear: () => <div>ActionClear</div>,
  AlertHelpLine: () => <div>AlertHelpLine</div>,
  ActionRightChevron: () => {
    SVG: <div>ActionRightChevron</div>
  },
}))

jest.mock('../../../controls/basic-controls/image/svgs/svg.tsx')

const localSVGSource: LocalSVGSource = {
  SVG: () => <svg>local SVG</svg>,
  size: {
    width: '30px',
    height: '30px',
  },
}

describe('Flexible Row', () => {
  let props: FlexibleRowProps

  describe('has main content', () => {
    describe('main content as string', () => {
      beforeEach(() => {
        props = {
          mainContent: 'text1',
        }
      })

      it('should render main content', () => {
        const { getByText } = render(<FlexibleRow {...props} />)
        const flexibleRow = getByText(props.mainContent as string)
        expect(flexibleRow).toBeDefined()
      })
    })

    describe('main content as FlexibleMainContentRow', () => {
      describe('has main text', () => {
        const mainContentRow: FlexibleMainContentRow = { mainText: 'text1' }
        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('should render main text', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText(props.mainContent?.mainText as string)
          expect(flexibleRow).toBeDefined()
        })
      })

      describe('has right Text ', () => {
        const mainContentRow: FlexibleMainContentRow = { mainText: 'text1', rightText: 'right text' }
        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('should render right text', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText(props.mainContent?.rightText as string)
          expect(flexibleRow).toBeDefined()
        })
      })

      describe('has help tool tip', () => {
        const mainContentRow: FlexibleMainContentRow = {
          mainText: 'text1',
          mainTextHelpTooltipClickAction: jest.fn(),
        }

        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('should render helper icon', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText('SVG')
          expect(flexibleRow).toBeDefined()
        })
      })
    })
  })

  describe('has sub content', () => {
    describe('has sub content as string', () => {
      beforeEach(() => {
        props = {
          mainContent: 'text1',
          subContent: 'subContent',
        }
      })

      it('should render sub content', () => {
        const { getByText } = render(<FlexibleRow {...props} />)
        const flexibleRow = getByText(props.subContent as string)
        expect(flexibleRow).toBeDefined()
      })
    })
    describe('has sub content as FlexibleSubContentRow', () => {
      describe('has sub text', () => {
        const subContentRow: FlexibleSubContentRow = { subText: 'text2' }
        beforeEach(() => {
          props = {
            mainContent: 'text1',
            subContent: subContentRow,
          }
        })

        it('should render sub text', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText(props.subContent?.subText as string)
          expect(flexibleRow).toBeDefined()
        })
      })

      describe('has clickable sub text', () => {
        const subContentRow: FlexibleSubContentRow = {
          subText: 'text2',
          clickableSubText: 'text3',
          clickableSubTextClickAction: jest.fn(),
        }
        beforeEach(() => {
          props = {
            mainContent: 'text1',
            subContent: subContentRow,
          }
        })

        it('should render clickable sub text', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText(props.subContent?.clickableSubText as string)
          expect(flexibleRow).toBeDefined()
        })

        it('should call clickableSubTextClickAction on clickable sub text click', () => {
          const { getByText } = render(<FlexibleRow {...props} />)
          const flexibleRow = getByText(props.subContent?.clickableSubText as string)
          fireEvent.click(flexibleRow)
          expect(props.subContent?.clickableSubTextClickAction).toBeCalledTimes(1)
        })
      })
    })
  })

  describe('has left icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftIcon: localSVGSource,
      }
    })

    it('should render icon', () => {
      const { getByText } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByText('SVG')
      expect(flexibleRow).toBeDefined()
    })
  })

  describe('has right icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightIcon: localSVGSource,
      }
    })

    it('should render icon', () => {
      const { getByText } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByText('SVG')
      expect(flexibleRow).toBeDefined()
    })
  })

  describe('has right Notification', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightNotification: 'right text',
      }
    })

    it('should render right Notification text', () => {
      const { getByText } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByText(props.rightNotification as string)
      expect(flexibleRow).toBeDefined()
    })
  })

  describe('has left action', () => {
    const customProps: ToggleProps = { state: true, onChange: jest.fn() }
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftAction: { type: 'switch', props: customProps },
      }
    })

    it('should render left action(Switch)', () => {
      const { getByRole } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByRole('switch')
      expect(flexibleRow).toBeDefined()
    })
  })

  describe('has right action', () => {
    const customProps: ToggleProps = { state: true, onChange: jest.fn() }
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightAction: { type: 'switch', props: customProps },
      }
    })

    it('should render right action(Switch)', () => {
      const { getByRole } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByRole('switch')
      expect(flexibleRow).toBeDefined()
    })
  })

  describe('is clicked', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        clickAction: jest.fn(),
      }
    })

    it('should call clickAction', () => {
      const { getByText } = render(<FlexibleRow {...props} />)
      const flexibleRow = getByText(props.mainContent as string)
      fireEvent.click(flexibleRow)

      expect(props.clickAction).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Flexible Row snapshot Tests', () => {
  let props: FlexibleRowProps

  describe('has main content', () => {
    describe('FlexibleRow has main content', () => {
      beforeEach(() => {
        props = {
          mainContent: 'text1',
        }
      })
      it('FlexibleRow creates properly', () => {
        const tree = renderer.create(<FlexibleRow {...props} />)
        expect(tree).toMatchSnapshot()
      })
    })

    describe('main content as FlexibleMainContentRow', () => {
      describe('has main text', () => {
        const mainContentRow: FlexibleMainContentRow = { mainText: 'text1' }
        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('FlexibleRow creates properly', () => {
          const tree = renderer.create(<FlexibleRow {...props} />)
          expect(tree).toMatchSnapshot()
        })
      })

      describe('has right Text ', () => {
        const mainContentRow: FlexibleMainContentRow = { mainText: 'text1', rightText: 'right text' }
        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('FlexibleRow creates properly', () => {
          const tree = renderer.create(<FlexibleRow {...props} />)
          expect(tree).toMatchSnapshot()
        })
      })

      describe('has help tool tip', () => {
        const mainContentRow: FlexibleMainContentRow = {
          mainText: 'text1',
          mainTextHelpTooltipClickAction: jest.fn(),
        }

        beforeEach(() => {
          props = {
            mainContent: mainContentRow,
          }
        })

        it('FlexibleRow creates properly', () => {
          const tree = renderer.create(<FlexibleRow {...props} />)
          expect(tree).toMatchSnapshot()
        })
      })
    })
  })

  describe('has sub content', () => {
    describe('has sub content as string', () => {
      beforeEach(() => {
        props = {
          mainContent: 'text1',
          subContent: 'subContent',
        }
      })

      it('FlexibleRow creates properly', () => {
        const tree = renderer.create(<FlexibleRow {...props} />)
        expect(tree).toMatchSnapshot()
      })
    })
    describe('has sub content as FlexibleSubContentRow', () => {
      describe('has sub text', () => {
        const subContentRow: FlexibleSubContentRow = { subText: 'text2' }
        beforeEach(() => {
          props = {
            mainContent: 'text1',
            subContent: subContentRow,
          }
        })

        it('FlexibleRow creates properly', () => {
          const tree = renderer.create(<FlexibleRow {...props} />)
          expect(tree).toMatchSnapshot()
        })
      })

      describe('has clickable sub text', () => {
        const subContentRow: FlexibleSubContentRow = {
          subText: 'text2',
          clickableSubText: 'text3',
          clickableSubTextClickAction: jest.fn(),
        }
        beforeEach(() => {
          props = {
            mainContent: 'text1',
            subContent: subContentRow,
          }
        })

        it('FlexibleRow creates properly', () => {
          const tree = renderer.create(<FlexibleRow {...props} />)
          expect(tree).toMatchSnapshot()
        })
      })
    })
  })

  describe('has left icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftIcon: localSVGSource,
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has right icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightIcon: localSVGSource,
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has right Notification', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightNotification: 'right text',
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has left action', () => {
    const customProps: ToggleProps = { state: true, onChange: jest.fn() }
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftAction: { type: 'switch', props: customProps },
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has right action', () => {
    const customProps: ToggleProps = { state: true, onChange: jest.fn() }
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        rightAction: { type: 'switch', props: customProps },
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has icon tint', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftIcon: localSVGSource,
        iconTint: 'brand',
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has main content tint', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftIcon: localSVGSource,
        mainContentTint: 'brand',
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('has main content text type', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        leftIcon: localSVGSource,
        mainContentTextType: 'primary3',
      }
    })

    it('FlexibleRow creates properly', () => {
      const tree = renderer.create(<FlexibleRow {...props} />)
      expect(tree).toMatchSnapshot()
    })
  })
})
