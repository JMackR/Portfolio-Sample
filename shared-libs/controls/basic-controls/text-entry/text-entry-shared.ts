import { useColorsForTextColorsCollection, useFontForTextType } from '@sample/themes'
import type { TextEntryProps } from './text-entry.props'

export const ComputePropsForTextEntryProps = (props: TextEntryProps) => {
  const {
    autoCapitalize,
    autoCorrect,
    autoCompleteType,
    textType,
    textColor: textColorName,
    hintColor: hintColorName,
    linesMaximum,
    linesMinimum,
    tintColor: tintColorName,
  } = props

  const font = useFontForTextType(textType !== undefined ? textType : 'secondary3')
  const minLineHeight = Math.max(Math.floor(linesMinimum !== undefined ? linesMinimum : 1), 1)
  const maxLineHeight = Math.max(Math.floor(linesMaximum !== undefined ? linesMaximum : minLineHeight), minLineHeight)
  const isMultiline = minLineHeight > 1 || maxLineHeight > 1
  const minPointHeight = minLineHeight * font.lineHeight
  const maxPointHeight = maxLineHeight * font.lineHeight

  const [primaryColor, hintColor, tintColor] = useColorsForTextColorsCollection([
    textColorName !== undefined ? textColorName : 'primary3',
    hintColorName !== undefined ? hintColorName : 'primary2',
    tintColorName !== undefined ? tintColorName : 'primary1',
  ])

  return {
    autoCapitalize: autoCapitalize !== undefined ? autoCapitalize : 'none',
    autoCorrect: autoCorrect !== undefined ? autoCorrect : true,
    autoCompleteType: autoCompleteType !== undefined ? autoCompleteType : 'off', // Android only
    font,
    minLineHeight,
    maxLineHeight,
    minPointHeight,
    maxPointHeight,
    isMultiline,
    primaryColor,
    hintColor,
    tintColor,
  }
}
