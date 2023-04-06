import React from 'react'
import { LocationPinFill } from '@sample/assets'
import { LIGHT_MODE_COLOR_THEME as TEST_THEME } from '@sample/themes/colors'
import { MOBILE_FONT_THEME as TEST_FONTS } from '@sample/themes/fonts'
import { useFontTheme } from '@sample/themes/providers'
import { useColorTheme } from '@sample/themes/providers/color-theme-context-provider'
import { ensureHex } from '@sample/themes/utility/color-conversions'
import { shallow, ShallowWrapper } from 'enzyme'
import { TextStyle } from 'react-native'
import renderer from 'react-test-renderer'
import { ButtonPropsNative } from '../button-props.native'
import { Button } from '../button.native'

describe('Button Functionality Tests', () => {
  let wrapper: ShallowWrapper
  const click = jest.fn()
  const longClick = jest.fn()
  beforeEach(() => {
    wrapper = shallow(
      <Button title="test" buttonSize="large" buttonType="primary" onClick={click} onLongClick={longClick} />
    )
  })
  test('Click calls passed in onClick function', () => {
    // @ts-ignore
    wrapper.props().onPress()
    expect(click).toHaveBeenCalledTimes(1)
  })
  test('Long click calls passed in onLongClick function', () => {
    // @ts-ignore
    wrapper.props().onLongPress()
    expect(longClick).toHaveBeenCalledTimes(1)
  })
})

function mergeStylesArrayToObject(arr: any): Object {
  const result = {}
  for (let i = 0, len = arr.length; i < len; i++) {
    // expand each separate object into result
    for (const key of Object.keys(arr[i])) {
      // @ts-ignore
      result[key] = arr[i][key]
    }
  }
  return result
}

jest.mock('@sample/themes/providers/color-theme-context-provider')
// @ts-ignore
useColorTheme.mockReturnValue(TEST_THEME)

jest.mock('@sample/themes/providers/font-theme-context-provider')
// @ts-ignore
useFontTheme.mockReturnValue(TEST_FONTS)

const TRANSPARENT = '#00FFFFFF'

describe('Button Style Tests: Large', () => {
  test('Primary large button renders properly', () => {
    const tree = renderer.create(<Button title="test" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('test')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.brand)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test('Secondary large button renders properly', () => {
    const tree = renderer.create(
      <Button title="testingsecondary" buttonSize="large" buttonType="secondary" onClick={jest.fn()} />
    )

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('testingsecondary')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.crystal)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.brand)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBe(1)
  })
  test('Tertiary large button renders properly', () => {
    const tree = renderer.create(<Button title="tert" buttonSize="large" buttonType="tertiary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('tert')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.limestone)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.obsidian)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test('Sample large button renders properly', () => {
    const tree = renderer.create(<Button title="sample" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('sample')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.larchYellow)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.obsidian)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test('Flat large button renders properly', () => {
    const tree = renderer.create(<Button title="flat" buttonSize="large" buttonType="flat" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('flat')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TRANSPARENT)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.brand)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test('Disabled large button renders properly', () => {
    const tree = renderer.create(<Button title="disabled" buttonSize="large" buttonType="disabled" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('disabled')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.disabled)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.granite)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBe(1)
  })
})
describe('Button Style Tests: Small', () => {
  test('Primary small button renders properly', () => {
    const tree = renderer.create(<Button title="test" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe('test')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.brand)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.secondaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test('Secondary small button with subtitle renders properly', () => {
    const tree = renderer.create(
      <Button title="test" subtitle="smol" buttonSize="small" buttonType="primary" onClick={jest.fn()} />
    )

    const json = tree.toJSON()
    // @ts-ignore
    const containerStyle = json.props.style
    // @ts-ignore
    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    // @ts-ignore
    const text = json.children[0].children[0].children[0]
    // @ts-ignore
    const subtitle = json.children[0].children[1].children[0]

    // verify text is set
    expect(text).toBe('test')

    // verify subtitle
    expect(subtitle).toBe('smol')

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.brand)

    // verify text color
    // @ts-ignore
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.secondaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
})

describe('Button Snapshot Tests', () => {
  test('Primary large button renders properly', () => {
    const tree = renderer.create(<Button title="test" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('Secondary large button renders properly', () => {
    const tree = renderer.create(
      <Button title="testingsecondary" buttonSize="large" buttonType="secondary" onClick={jest.fn()} />
    )
    expect(tree).toMatchSnapshot()
  })
  test('Tertiary large button renders properly', () => {
    const tree = renderer.create(<Button title="tert" buttonSize="large" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('sample large button renders properly', () => {
    const tree = renderer.create(<Button title="sample" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test('Flat large button renders properly', () => {
    const tree = renderer.create(<Button title="flat" buttonSize="large" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test('Disabled large button renders properly', () => {
    const tree = renderer.create(<Button title="disabled" buttonSize="large" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('Primary small button renders properly', () => {
    const tree = renderer.create(<Button title="test" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('Secondary small button renders properly', () => {
    const tree = renderer.create(
      <Button title="testingsecondary" buttonSize="small" buttonType="secondary" onClick={jest.fn()} />
    )
    expect(tree).toMatchSnapshot()
  })
  test('Tertiary small button renders properly', () => {
    const tree = renderer.create(<Button title="tert" buttonSize="small" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('sample small button renders properly', () => {
    const tree = renderer.create(<Button title="sample" buttonSize="small" buttonType="secondary" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test('Flat small button renders properly', () => {
    const tree = renderer.create(<Button title="flat" buttonSize="small" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test('Disabled small button renders properly', () => {
    const tree = renderer.create(<Button title="disabled" buttonSize="small" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test('Primary large button with icon as LocalSVGSource renderer.creates properly', () => {
    const tree = renderer.create(
      <Button title="has svg" buttonSize="large" buttonType="primary" leftIcon={LocationPinFill} onClick={jest.fn()} />
    )

    expect(tree).toMatchSnapshot()
  })
  test('Primary small button with icon as LocalSVGSource renderer.creates properly', () => {
    const tree = renderer.create(
      <Button title="has svg" buttonSize="small" buttonType="primary" leftIcon={LocationPinFill} onClick={jest.fn()} />
    )

    expect(tree).toMatchSnapshot()
  })
})
